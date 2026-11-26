import React, { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  Check
} from 'lucide-react';
import { DayAvailability } from '../../types/booking';

interface AvailabilityCalendarProps {
  currentDate: Date;
  selectedDates: string[];
  onToggleDate: (dateStr: string) => void;
  onClearDates: () => void;
  onJumpToForm?: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  availability: DayAvailability[];
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  currentDate,
  selectedDates,
  onToggleDate,
  onClearDates,
  onJumpToForm,
  onPrevMonth,
  onNextMonth,
  onToday,
  availability
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  const selectedSet = useMemo(() => new Set(selectedDates), [selectedDates]);
  const sortedSelectedDates = useMemo(() => [...selectedDates].sort(), [selectedDates]);

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Build calendar matrix
  const calendarDays = useMemo(() => {
    const days: Array<{
      dayNumber: number | null;
      dateStr: string | null;
      data: DayAvailability | null;
      isPast: boolean;
      isToday: boolean;
    }> = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ dayNumber: null, dateStr: null, data: null, isPast: false, isToday: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayPad = d.toString().padStart(2, '0');
      const monthPad = (month + 1).toString().padStart(2, '0');
      const dateStr = `${year}-${monthPad}-${dayPad}`;
      const cellDate = new Date(year, month, d);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = cellDate < today;
      const isToday = dateStr === todayStr;
      const data = availability.find((a) => a.date === dateStr) || null;

      days.push({
        dayNumber: d,
        dateStr,
        data,
        isPast,
        isToday
      });
    }

    return days;
  }, [year, month, availability, todayStr]);

  const getStatusColorClass = (item: (typeof calendarDays)[0]) => {
    if (!item.dateStr || item.dayNumber === null) return 'bg-transparent cursor-default';

    const isSelected = selectedSet.has(item.dateStr);

    if (isSelected) {
      return 'opacity-100 bg-[#1b3d30] dark:bg-[#C5A45D] text-white dark:text-[#07150e] border-2 border-[#C5A45D] dark:border-white shadow-xl scale-[1.02] z-10 cursor-pointer ring-2 ring-[#C5A45D]/40';
    }

    if (item.isPast) {
      return 'opacity-100 bg-[#ECEFE9] dark:bg-[#14241c] text-[#3d4d45] dark:text-[#a8beb2] border border-gray-300 dark:border-white/25 cursor-not-allowed';
    }

    const status = item.data?.status || 'AVAILABLE';

    switch (status) {
      case 'BLOCKED':
        return 'opacity-100 bg-[#E9ECEF] dark:bg-[#1b2c25] text-[#283630] dark:text-[#d0ded7] border border-gray-400 dark:border-white/30 hover:border-[#C5A45D] cursor-pointer';
      case 'CONFIRMED':
        return 'opacity-100 bg-[#FCE8E8] dark:bg-[#3d171c] text-[#842029] dark:text-[#ffb8c0] border border-red-300 dark:border-red-500/80 hover:border-red-500 dark:hover:border-red-400 cursor-pointer';
      case 'PARTIALLY_BOOKED':
      case 'PENDING_ENQUIRY':
        return 'opacity-100 bg-[#FCF3DC] dark:bg-[#3b290c] text-[#7a5410] dark:text-[#ffe18c] border border-amber-300 dark:border-amber-500/80 hover:border-[#C5A45D] cursor-pointer';
      case 'AVAILABLE':
      default:
        return 'opacity-100 bg-[#E7F4EA] dark:bg-[#0f3420] text-[#15451c] dark:text-[#9ff7c4] border border-emerald-300 dark:border-emerald-500/80 hover:border-[#C5A45D] dark:hover:border-[#C5A45D] hover:shadow-md cursor-pointer';
    }
  };

  const getStatusBadgeText = (item: (typeof calendarDays)[0]) => {
    if (!item.dateStr || item.dayNumber === null) return null;
    if (selectedSet.has(item.dateStr)) return 'Selected';
    if (item.isPast) return 'Past';
    if (item.data?.isBlocked) return 'Blocked';
    if (item.data?.status === 'CONFIRMED') return 'Booked';
    if (item.data?.status === 'PARTIALLY_BOOKED') return '1 Slot';
    if (item.data?.status === 'PENDING_ENQUIRY') return 'Enquiry';
    return 'Available';
  };

  const getShortBadgeText = (item: (typeof calendarDays)[0]) => {
    if (!item.dateStr || item.dayNumber === null) return null;
    if (selectedSet.has(item.dateStr)) return 'Picked';
    if (item.isPast) return 'Past';
    if (item.data?.isBlocked) return 'Block';
    if (item.data?.status === 'CONFIRMED') return 'Booked';
    if (item.data?.status === 'PARTIALLY_BOOKED') return '1 Slot';
    if (item.data?.status === 'PENDING_ENQUIRY') return 'Req';
    return 'Avail';
  };

  return (
    <div className="w-full bg-white dark:bg-[#071710] border border-gray-200 dark:border-[#C5A45D]/40 shadow-2xl p-3.5 sm:p-6 lg:p-10 flex flex-col justify-between transition-colors duration-300 rounded-sm">
      {/* Month Navigation Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-gray-200 dark:border-white/15 gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FAF8F2] dark:bg-[#0e2c1c] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center border border-[#C5A45D]/40 shrink-0">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#234D3C] dark:text-[#C5A45D]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#234D3C] dark:text-[#f7e6b8] tracking-tight font-serif">
                {monthNames[month]} {year}
              </h2>
              <span className="text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300 font-medium tracking-wider uppercase block">
                Venue Calendar (IST) &bull; Click Dates to Select or Deselect Multiple Event Dates
              </span>
            </div>
          </div>

          {/* Controls: Prev, Today, Next */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={onToday}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#234D3C] dark:text-[#f7e6b8] bg-[#FAF8F2] dark:bg-[#0d2a1b] border border-gray-300 dark:border-[#C5A45D]/40 hover:bg-[#E8F2E8] dark:hover:bg-[#153f29] transition-colors cursor-pointer"
            >
              Today
            </button>
            <div className="flex items-center border border-gray-300 dark:border-[#C5A45D]/40 bg-white dark:bg-[#0d2a1b] shadow-sm">
              <button
                type="button"
                onClick={onPrevMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-white/15 text-[#202823] dark:text-white transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="w-px h-4 sm:h-5 bg-gray-200 dark:bg-white/15" />
              <button
                type="button"
                onClick={onNextMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-white/15 text-[#202823] dark:text-white transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 my-3 sm:my-5 text-center">
          {weekDayLabels.map((day, idx) => (
            <div
              key={day}
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider py-1.5 rounded ${
                idx === 0 || idx === 6
                  ? 'text-[#A07D32] dark:text-[#f3d489] bg-amber-500/10 dark:bg-amber-400/15'
                  : 'text-[#234D3C] dark:text-[#d2eae0] bg-gray-100 dark:bg-white/10'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Matrix */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
          {calendarDays.map((cell, idx) => {
            const badge = getStatusBadgeText(cell);
            const shortBadge = getShortBadgeText(cell);
            const isSelected = Boolean(cell.dateStr && selectedSet.has(cell.dateStr));

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.dateStr || cell.isPast}
                onClick={() => {
                  if (cell.dateStr && !cell.isPast) {
                    onToggleDate(cell.dateStr);
                  }
                }}
                aria-pressed={isSelected}
                className={`relative min-h-[52px] xs:min-h-[58px] sm:min-h-[85px] md:min-h-[105px] p-1 xs:p-1.5 sm:p-2.5 md:p-3.5 flex flex-col justify-between transition-all duration-200 text-left focus:outline-none rounded-sm ${getStatusColorClass(
                  cell
                )}`}
              >
                {cell.dayNumber && (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[11px] xs:text-xs sm:text-base font-bold ${
                          isSelected
                            ? 'text-white dark:text-[#07150e]'
                            : cell.isPast
                            ? 'text-[#3d4d45] dark:text-[#b4c8bd]'
                            : 'text-[#143325] dark:text-white'
                        }`}
                      >
                        {cell.dayNumber}
                      </span>
                      {isSelected ? (
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A45D] dark:bg-[#07150e] text-[#07150e] dark:text-[#C5A45D] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </span>
                      ) : (
                        cell.isToday && (
                          <span
                            className="w-2 h-2 rounded-full shrink-0 bg-[#C5A45D] ring-2 ring-[#C5A45D]/40"
                            title="Today"
                          />
                        )
                      )}
                    </div>

                    {/* Status / Selected Indicator Badge */}
                    <div className="mt-auto pt-0.5 sm:pt-1 w-full">
                      <span
                        className={`block text-center sm:inline-block text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-wider px-1 sm:px-1.5 py-0.5 truncate rounded ${
                          isSelected
                            ? 'bg-[#C5A45D] text-[#07150e] dark:bg-[#07150e] dark:text-[#C5A45D]'
                            : cell.isPast
                            ? 'bg-gray-200 dark:bg-white/15 text-[#2d3b34] dark:text-[#d2e0d8]'
                            : cell.data?.isBlocked
                            ? 'bg-gray-300 dark:bg-white/15 text-[#1f2c26] dark:text-[#e1ebe5]'
                            : cell.data?.status === 'CONFIRMED'
                            ? 'bg-red-100 dark:bg-red-950 text-red-900 dark:text-[#ffc2c8] border border-red-300 dark:border-red-600/80'
                            : cell.data?.status === 'PARTIALLY_BOOKED' ||
                              cell.data?.status === 'PENDING_ENQUIRY'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-[#ffe699] border border-amber-300 dark:border-amber-600/80'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-[#b2f7ce] border border-emerald-300 dark:border-emerald-600/80'
                        }`}
                      >
                        <span className="sm:hidden">{shortBadge}</span>
                        <span className="hidden sm:inline">{badge}</span>
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Dates Display Box Below Calendar */}
        <div className="mt-5 sm:mt-6 p-4 sm:p-5 bg-[#FAF8F2] dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#234D3C] dark:text-[#f3eedd]">
                Selected Event Dates
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e]">
                {sortedSelectedDates.length} {sortedSelectedDates.length === 1 ? 'Date' : 'Dates'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {sortedSelectedDates.length > 0 && (
                <button
                  type="button"
                  onClick={onClearDates}
                  className="px-3 py-1.5 text-[11px] uppercase font-bold tracking-wider border border-gray-300 dark:border-white/25 bg-white dark:bg-[#07150e] text-[#234D3C] dark:text-gray-200 hover:border-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
              {sortedSelectedDates.length > 0 && onJumpToForm && (
                <button
                  type="button"
                  onClick={onJumpToForm}
                  className="px-3.5 py-1.5 text-[11px] uppercase font-bold tracking-wider bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-colors cursor-pointer"
                >
                  Review in Enquiry Form &darr;
                </button>
              )}
            </div>
          </div>

          {sortedSelectedDates.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {sortedSelectedDates.map((dateStr) => (
                <span
                  key={dateStr}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-[#07150e] border border-[#C5A45D] text-[#234D3C] dark:text-[#f3eedd] shadow-sm"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#C5A45D] shrink-0" />
                  <span>{formatShortDate(dateStr)}</span>
                  <button
                    type="button"
                    onClick={() => onToggleDate(dateStr)}
                    title={`Deselect ${formatShortDate(dateStr)}`}
                    aria-label={`Deselect ${formatShortDate(dateStr)}`}
                    className="p-0.5 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Click on one or more upcoming dates on the calendar above to select your preferred event dates. Click a selected date again to deselect it.
            </p>
          )}
        </div>
      </div>

      {/* Calendar Legend below Calendar */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
            Legend &amp; Availability Indicators
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300">
            Select multiple event dates to populate your booking enquiry automatically
          </span>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1b3d30] dark:bg-[#C5A45D] border-2 border-[#C5A45D] dark:border-white shrink-0 rounded-sm" />
            <span className="text-gray-900 dark:text-white font-bold text-[10px] sm:text-[11px]">
              Selected Date
            </span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#E7F4EA] dark:bg-[#0f3420] border border-emerald-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">
              Available
            </span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FCF3DC] dark:bg-[#3b290c] border border-amber-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">
              Pending Enquiry
            </span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FCE8E8] dark:bg-[#3d171c] border border-red-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">
              Booked
            </span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#ECEFE9] dark:bg-[#14241c] border border-gray-400 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">
              Past / Blocked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
