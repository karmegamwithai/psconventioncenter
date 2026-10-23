import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { DayAvailability } from '../../types/booking';

interface AvailabilityCalendarProps {
  currentDate: Date;
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  availability: DayAvailability[];
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
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

  // First day of month & number of days
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Today check
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  // Build calendar matrix
  const calendarDays = useMemo(() => {
    const days: Array<{
      dayNumber: number | null;
      dateStr: string | null;
      data: DayAvailability | null;
      isPast: boolean;
      isToday: boolean;
    }> = [];

    // Prepend blanks
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ dayNumber: null, dateStr: null, data: null, isPast: false, isToday: false });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dayPad = d.toString().padStart(2, '0');
      const monthPad = (month + 1).toString().padStart(2, '0');
      const dateStr = `${year}-${monthPad}-${dayPad}`;
      const cellDate = new Date(year, month, d);
      cellDate.setHours(23, 59, 59, 999);

      const isPast = cellDate < today;
      const isToday = dateStr === todayStr;
      const data = availability.find(a => a.date === dateStr) || null;

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

  const getStatusColorClass = (item: typeof calendarDays[0]) => {
    if (!item.dateStr || item.dayNumber === null) return 'bg-transparent cursor-default';

    const isSelected = selectedDate === item.dateStr;
    if (isSelected) {
      return 'bg-[#1b3d30] dark:bg-[#C5A45D] text-white dark:text-[#07150e] border-2 border-[#C5A45D] dark:border-white shadow-xl scale-[1.02] z-10';
    }

    if (item.isPast) {
      return 'bg-[#F3F4F6] dark:bg-[#08150f] text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-white/5 opacity-55';
    }

    const status = item.data?.status || 'AVAILABLE';

    switch (status) {
      case 'BLOCKED':
        return 'bg-[#F3F4F6] dark:bg-[#08150f] text-gray-500 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-white/5';
      case 'CONFIRMED':
        return 'bg-[#FBEBEB] dark:bg-[#2b1013] text-[#842029] dark:text-[#ff98a2] hover:border-red-400 dark:hover:border-red-400 border border-red-200 dark:border-red-800/70 cursor-pointer';
      case 'PARTIALLY_BOOKED':
        return 'bg-[#FBF5E6] dark:bg-[#2b1e09] text-[#7c5819] dark:text-[#fed77a] hover:border-amber-400 dark:hover:border-amber-400 border border-amber-200 dark:border-amber-700/70 cursor-pointer';
      case 'PENDING_ENQUIRY':
        return 'bg-[#FBF5E6] dark:bg-[#2b1e09] text-[#7A641F] dark:text-[#fed77a] hover:border-[#C5A45D] dark:hover:border-[#C5A45D] border border-amber-200 dark:border-amber-700/70 cursor-pointer';
      case 'AVAILABLE':
      default:
        return 'bg-[#EBF5ED] dark:bg-[#0e2c1c] text-[#1B4D20] dark:text-[#8af0b5] hover:border-[#C5A45D] dark:hover:border-[#C5A45D] border border-emerald-200 dark:border-emerald-700/70 hover:shadow-md cursor-pointer';
    }
  };

  const getStatusBadgeText = (item: typeof calendarDays[0]) => {
    if (!item.dateStr || item.dayNumber === null) return null;
    if (selectedDate === item.dateStr) return 'Selected';
    if (item.isPast) return 'Past';
    if (item.data?.isBlocked) return 'Blocked';
    if (item.data?.status === 'CONFIRMED') return 'Booked';
    if (item.data?.status === 'PARTIALLY_BOOKED') return '1 Slot';
    if (item.data?.status === 'PENDING_ENQUIRY') return 'Enquiry';
    return 'Available';
  };

  const getShortBadgeText = (item: typeof calendarDays[0]) => {
    if (!item.dateStr || item.dayNumber === null) return null;
    if (selectedDate === item.dateStr) return 'Sel';
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
              <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-300 font-medium tracking-wider uppercase block">
                Venue Calendar (IST) &bull; Live Slot Status
              </span>
            </div>
          </div>

          {/* Controls: Prev, Today, Next */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onToday}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#234D3C] dark:text-[#f7e6b8] bg-[#FAF8F2] dark:bg-[#0d2a1b] border border-gray-300 dark:border-[#C5A45D]/40 hover:bg-[#E8F2E8] dark:hover:bg-[#153f29] transition-colors cursor-pointer"
            >
              Today
            </button>
            <div className="flex items-center border border-gray-300 dark:border-[#C5A45D]/40 bg-white dark:bg-[#0d2a1b] shadow-sm">
              <button
                onClick={onPrevMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-white/15 text-[#202823] dark:text-white transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="w-px h-4 sm:h-5 bg-gray-200 dark:bg-white/15" />
              <button
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
                  ? 'text-[#C5A45D] dark:text-[#f3d489] bg-amber-500/5 dark:bg-amber-400/10'
                  : 'text-[#234D3C] dark:text-[#d2eae0] bg-gray-50 dark:bg-white/5'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Matrix - Full Screen Responsive */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
          {calendarDays.map((cell, idx) => {
            const badge = getStatusBadgeText(cell);
            const shortBadge = getShortBadgeText(cell);
            const isSelected = selectedDate === cell.dateStr;

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.dateStr || cell.isPast || cell.data?.isBlocked}
                onClick={() => cell.dateStr && onSelectDate(cell.dateStr)}
                className={`relative min-h-[48px] xs:min-h-[54px] sm:min-h-[85px] md:min-h-[105px] p-1 xs:p-1.5 sm:p-2.5 md:p-3.5 flex flex-col justify-between transition-all duration-200 text-left focus:outline-none rounded-sm ${getStatusColorClass(
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
                            ? 'text-gray-400 dark:text-gray-500'
                            : 'text-[#143325] dark:text-white'
                        }`}
                      >
                        {cell.dayNumber}
                      </span>
                      {cell.isToday && (
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isSelected
                              ? 'bg-white dark:bg-[#07150e]'
                              : 'bg-[#C5A45D] ring-2 ring-[#C5A45D]/30'
                          }`}
                          title="Today"
                        />
                      )}
                    </div>

                    {/* Status badge in cell */}
                    <div className="mt-auto pt-0.5 sm:pt-1 w-full">
                      <span
                        className={`block text-center sm:inline-block text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-wider px-1 sm:px-1.5 py-0.5 truncate rounded ${
                          isSelected
                            ? 'bg-[#C5A45D] text-[#07150e] dark:bg-[#07150e] dark:text-[#C5A45D]'
                            : cell.isPast
                            ? 'bg-black/5 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                            : cell.data?.status === 'CONFIRMED'
                            ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-[#ffb1b8] border border-red-200 dark:border-red-700/50'
                            : cell.data?.status === 'PARTIALLY_BOOKED' || cell.data?.status === 'PENDING_ENQUIRY'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-[#ffe08b] border border-amber-200 dark:border-amber-700/50'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-[#a5f3c5] border border-emerald-200 dark:border-emerald-700/50'
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
      </div>

      {/* Calendar Legend below Calendar */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
            Legend & Color Codes
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-300">
            Click any green/gold available date to proceed with your booking enquiry
          </span>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#EBF5ED] dark:bg-[#0e2c1c] border border-emerald-400 dark:border-emerald-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">Available</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FBF5E6] dark:bg-[#2b1e09] border border-amber-400 dark:border-amber-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">Pending Enquiry</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FBEBEB] dark:bg-[#2b1013] border border-red-400 dark:border-red-500 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">Booked</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#F3F4F6] dark:bg-[#08150f] border border-gray-400 dark:border-gray-600 shrink-0 rounded-sm" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-[10px] sm:text-[11px]">Blocked / Past</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-gray-50 dark:bg-white/5 col-span-2 xs:col-span-1">
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1b3d30] dark:bg-[#C5A45D] border-2 border-[#C5A45D] dark:border-white shrink-0 rounded-sm" />
            <span className="text-gray-900 dark:text-white font-bold text-[10px] sm:text-[11px]">Selected Date</span>
          </div>
        </div>
      </div>
    </div>
  );
};
