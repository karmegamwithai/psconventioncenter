import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { adminAuth } from '../lib/firebase-admin.ts';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    username?: string;
    authType: 'admin_credentials' | 'firebase';
  };
}

// Ephemeral in-memory signing secret if SESSION_SECRET is not provided in process.env
const SESSION_SIGNING_KEY = process.env.SESSION_SECRET
  ? Buffer.from(process.env.SESSION_SECRET, 'utf-8')
  : crypto.randomBytes(32);

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const effectiveSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, effectiveSalt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt: effectiveSalt,
  };
}

export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, storedSalt, 64);
    const storedBuffer = Buffer.from(storedHash, 'hex');
    if (derivedKey.length !== storedBuffer.length) return false;
    return crypto.timingSafeEqual(derivedKey, storedBuffer);
  } catch {
    return false;
  }
}

export function verifyPlainSecretTimingSafe(input: string, secret: string): boolean {
  const a = Buffer.from(input, 'utf-8');
  const b = Buffer.from(secret, 'utf-8');
  if (a.length !== b.length) {
    // Compare against dummy buffer of same length to avoid timing leak
    crypto.timingSafeEqual(a, Buffer.alloc(a.length));
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export function createAdminSessionToken(username: string): string {
  const payload = JSON.stringify({
    sub: username,
    role: 'admin',
    exp: Date.now() + TOKEN_TTL_MS,
    nonce: crypto.randomBytes(8).toString('hex'),
  });
  const payloadB64 = Buffer.from(payload, 'utf-8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SIGNING_KEY)
    .update(payloadB64)
    .digest('base64url');
  return `adm.${payloadB64}.${signature}`;
}

export function verifyAdminSessionToken(token: string): { username: string } | null {
  if (!token.startsWith('adm.')) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [, payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SIGNING_KEY)
    .update(payloadB64)
    .digest('base64url');

  const sigBuf = Buffer.from(signature, 'utf-8');
  const expBuf = Buffer.from(expectedSig, 'utf-8');
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!decoded || typeof decoded.exp !== 'number' || Date.now() > decoded.exp) {
      return null;
    }
    if (decoded.role !== 'admin' || typeof decoded.sub !== 'string') {
      return null;
    }
    return { username: decoded.sub };
  } catch {
    return null;
  }
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split('Bearer ')[1].trim();

  // 1. Check custom HMAC-signed Admin Session Token
  const adminSession = verifyAdminSessionToken(token);
  if (adminSession) {
    req.user = {
      uid: `admin:${adminSession.username}`,
      username: adminSession.username,
      authType: 'admin_credentials',
    };
    return next();
  }

  // 2. Otherwise verify Firebase ID Token
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      authType: 'firebase',
    };
    return next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};
