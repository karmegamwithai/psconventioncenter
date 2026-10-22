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
      return 'bg-[#1b3d30] text-white border-2 border-[#C5A45D] shadow-xl scale-[1.02] z-10';
    }

    if (item.isPast) {
      return 'bg-[#F3F4F6] text-gray-400 cursor-not-allowed border border-transparent opacity-60';
    }

    const status = item.data?.status || 'AVAILABLE';

    switch (status) {
      case 'BLOCKED':
        return 'bg-[#F3F4F6] text-gray-500 cursor-not-allowed border border-gray-200';
      case 'CONFIRMED':
        return 'bg-[#FBEBEB] text-[#842029] hover:border-red-400 border border-red-200 cursor-pointer';
      case 'PARTIALLY_BOOKED':
        return 'bg-[#FBF5E6] text-[#7c5819] hover:border-amber-400 border border-amber-200 cursor-pointer';
      case 'PENDING_ENQUIRY':
        return 'bg-[#FBF5E6] text-[#7A641F] hover:border-[#C5A45D] border border-amber-200 cursor-pointer';
      case 'AVAILABLE':
      default:
        return 'bg-[#EBF5ED] text-[#1B4D20] hover:border-[#C5A45D] border border-emerald-200 hover:shadow-md cursor-pointer';
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

  return (
    <div className="w-full bg-white border border-gray-200 shadow-xl p-6 sm:p-10 flex flex-col justify-between">
      {/* Month Navigation Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-[#FAF8F2] text-[#234D3C] flex items-center justify-center border border-[#C5A45D]/40">
              <CalendarIcon className="w-5 h-5 text-[#234D3C]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#234D3C] tracking-tight">
                {monthNames[month]} {year}
              </h2>
              <span className="text-[11px] text-gray-500 font-medium tracking-wider uppercase">
                Venue Calendar (IST)
              </span>
            </div>
          </div>

          {/* Controls: Prev, Today, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToday}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#234D3C] bg-[#FAF8F2] border border-gray-300 hover:bg-[#E8F2E8] transition-colors cursor-pointer"
            >
              Today
            </button>
            <div className="flex items-center border border-gray-300 bg-white shadow-sm">
              <button
                onClick={onPrevMonth}
                className="p-2 hover:bg-gray-100 text-[#202823] transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-px h-5 bg-gray-200" />
              <button
                onClick={onNextMonth}
                className="p-2 hover:bg-gray-100 text-[#202823] transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 my-5 text-center">
          {weekDayLabels.map((day, idx) => (
            <div
              key={day}
              className={`text-xs font-bold uppercase tracking-wider py-1 ${
                idx === 0 || idx === 6 ? 'text-[#C5A45D]' : 'text-[#234D3C]'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Matrix - Full Screen Responsive */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {calendarDays.map((cell, idx) => {
            const badge = getStatusBadgeText(cell);
            const isSelected = selectedDate === cell.dateStr;

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.dateStr || cell.isPast || cell.data?.isBlocked}
                onClick={() => cell.dateStr && onSelectDate(cell.dateStr)}
                className={`relative min-h-[70px] sm:min-h-[105px] p-2.5 sm:p-3.5 flex flex-col justify-between transition-all duration-200 text-left focus:outline-none ${getStatusColorClass(
                  cell
                )}`}
              >
                {cell.dayNumber && (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs sm:text-base font-bold ${isSelected ? 'text-[#C5A45D]' : ''}`}>
                        {cell.dayNumber}
                      </span>
                      {cell.isToday && (
                        <span
                          className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#C5A45D]' : 'bg-[#234D3C]'}`}
                          title="Today"
                        />
                      )}
                    </div>

                    {/* Status badge in cell */}
                    <div className="mt-auto pt-1">
                      <span
                        className={`inline-block text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 ${
                          isSelected
                            ? 'bg-[#C5A45D] text-[#0e241b]'
                            : 'bg-black/5 text-current'
                        }`}
                      >
                        {badge}
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
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C]">
            Legend
          </span>
          <span className="text-[11px] text-gray-500">
            Click any available date to proceed with enquiry
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#EBF5ED] border border-emerald-300 shrink-0" />
            <span className="text-[#202823] font-medium text-[11px]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#FBF5E6] border border-amber-300 shrink-0" />
            <span className="text-[#202823] font-medium text-[11px]">Pending Enquiry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#FBEBEB] border border-red-300 shrink-0" />
            <span className="text-[#202823] font-medium text-[11px]">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#F3F4F6] border border-gray-300 shrink-0" />
            <span className="text-[#202823] font-medium text-[11px]">Blocked / Past</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#1b3d30] border-2 border-[#C5A45D] shrink-0" />
            <span className="text-[#202823] font-bold text-[11px]">Selected Date</span>
          </div>
        </div>
      </div>
    </div>
  );
};
