import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isAfter, differenceInYears } from 'date-fns';
import { useState, useRef, useCallback, forwardRef, useImperativeHandle, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { DatePickerProps, DatePickerRef } from './type';
import { useClickOutside } from '@/hooks/useClickOutside';
import styles from './DatePicker.module.css';
import { MONTHS } from '@/constants/options';
import { ru } from 'date-fns/locale';
import { Button } from '../Button';

// ---------------------------------------------------------------

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(({
  name = 'birthDate',
  placeholder = 'дд.мм.гггг',
  disabled = false,
  className = '',
  onChange,
  defaultValue = null,
  startYear = 1900,
  endYear = new Date().getFullYear(),

  // Пропсы для интеграции с useForm
  value: externalValue,
  error: externalError,
  onBlur,
}, ref) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || externalValue || null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(defaultValue || externalValue || null);
  const [currentYear, setCurrentYear] = useState<number>(selectedDate?.getFullYear() || new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate?.getMonth() || new Date().getMonth());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = !!selectedDate;

// ---------------------------------------------------------------
// Синхронизация с внешним значением (useForm)
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== selectedDate) {
      const date = typeof externalValue === 'string' ? new Date(externalValue) : externalValue;

      setSelectedDate(date);
      setTempSelectedDate(date);
      if (date && !isNaN(date.getTime())) {
        setCurrentYear(date.getFullYear());
        setCurrentMonth(date.getMonth());
      }
    }
  }, [
    externalValue,
    selectedDate
  ]);

// ---------------------------------------------------------------

  useClickOutside(wrapperRef, () => {
    if (isOpen) {
      setTempSelectedDate(selectedDate);
      if (selectedDate) {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth());
      }
      setIsOpen(false);
      onBlur?.();
    }
  });

// ---------------------------------------------------------------

  const years = useMemo(() => {
    const yearsList = [];
    for (let year = startYear; year <= endYear; year++) {
      yearsList.push(year);
    }
    return yearsList;
  }, [startYear, endYear]);

// ---------------------------------------------------------------

  const calculateAge = useCallback((date: Date): number => {
    return differenceInYears(new Date(), date);
  }, []);

// ---------------------------------------------------------------

  const updateDateValue = useCallback((date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const age = calculateAge(date);

      // Нормализуем дату в UTC без смещения
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const normalizedDate = `${year}-${month}-${day}`; // ← "2000-03-10"

      onChange?.({
        date: normalizedDate,  // ← отправляем YYYY-MM-DD, а не ISO
        age: age,
        isValid: true,
        error: undefined
      });
    } else {
      onChange?.({
        date: null,
        age: null,
        isValid: true,
        error: undefined
      });
    }
  }, [calculateAge, onChange]);

// ---------------------------------------------------------------

  useImperativeHandle(ref, () => ({
    openCalendar: () => setIsOpen(true),
    closeCalendar: () => setIsOpen(false),
    getValue: () => selectedDate,
    getAge: () => selectedDate ? calculateAge(selectedDate) : null,
    clear: () => {
      setSelectedDate(null);
      setTempSelectedDate(null);
      updateDateValue(null);
    },
    getError: () => externalError,
  }));

// ---------------------------------------------------------------

  const isDateDisabled = useCallback((date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, today);
  }, []);

// ---------------------------------------------------------------

  const handleDateSelect = useCallback((day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    if (isDateDisabled(newDate)) return;
    setTempSelectedDate(newDate);
  }, [
    currentYear,
    currentMonth,
    isDateDisabled
  ]);

  const handleMonthChange = useCallback((monthIndex: number) => {
    setCurrentMonth(monthIndex);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

// ---------------------------------------------------------------

  const handleConfirm = useCallback(() => {
    if (tempSelectedDate) {
      updateDateValue(tempSelectedDate);
    }
    setIsOpen(false);
  }, [tempSelectedDate, updateDateValue]);

  const handleCancel = useCallback(() => {
    setTempSelectedDate(selectedDate);
    if (selectedDate) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
    setIsOpen(false);
  }, [selectedDate]);

// ---------------------------------------------------------------

  const toggleCalendar = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTempSelectedDate(selectedDate);
      }
    }
  }, [disabled, isOpen, selectedDate]);

// ---------------------------------------------------------------

  const generateDays = useCallback(() => {
    const date = new Date(currentYear, currentMonth, 1);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const startDate = new Date(monthStart);
    const startDayOfWeek = startDate.getDay();
    const offsetDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    startDate.setDate(startDate.getDate() - offsetDays);

    const endDate = new Date(monthEnd);
    const endDayOfWeek = endDate.getDay();
    const remainingDays = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
    endDate.setDate(endDate.getDate() + remainingDays);

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentYear, currentMonth]);

// ---------------------------------------------------------------

  const isTodayDate = useCallback((date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }, []);

// ---------------------------------------------------------------

  const days = generateDays();
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const displayValue = selectedDate && !isNaN(selectedDate.getTime())
    ? format(selectedDate, 'dd.MM.yyyy', { locale: ru })
    : '';

// ---------------------------------------------------------------

  const calendarVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -8,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: 0.15 }
    }
  };

// ---------------------------------------------------------------

  return (
    <div
      className={`${styles.datePickerContainer} ${className}`}
      ref={wrapperRef}
    >
      <span className={`${styles.label} h-body`}>Дата рождения</span>

      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          name={name}
          type="text"
          value={displayValue}
          onClick={toggleCalendar}
          readOnly
          placeholder={placeholder}
          disabled={disabled}
          className={`h-body
            ${styles.dateInput}
            ${externalError ? styles.error : ''}
            ${disabled ? styles.disabled : ''}
            ${hasValue ? styles.hasValue : ''}
          `}
        />

        <span className={styles.calendarIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.35 6.19a.7.7 0 0 1-.7-.7v-2.8c0-.37.32-.69.7-.69s.7.32.7.7v2.79a.7.7 0 0 1-.7.7M15.8 6.19a.7.7 0 0 1-.7-.7v-2.8c0-.37.3-.69.7-.69.37 0 .69.32.69.7v2.79a.7.7 0 0 1-.7.7M8.81 14.33a1 1 0 0 1-.35-.08 1 1 0 0 1-.3-.2.93.93 0 0 1-.2-1.01q.06-.16.2-.3a.96.96 0 0 1 1.31 0 1 1 0 0 1 .26.84l-.06.17-.08.17-.12.14a1 1 0 0 1-.66.27M12.07 14.33a1 1 0 0 1-.35-.08 1 1 0 0 1-.31-.2 1 1 0 0 1-.27-.65q0-.19.07-.36t.2-.3q.14-.13.3-.2a.9.9 0 0 1 1.02.2q.26.27.27.66 0 .08-.02.18l-.05.17-.09.17-.11.14a1 1 0 0 1-.66.27M15.33 14.33a1 1 0 0 1-.36-.08 1 1 0 0 1-.3-.2l-.12-.13-.08-.17-.06-.17-.01-.18q0-.39.27-.66.13-.13.3-.2a.9.9 0 0 1 1.02.2q.25.27.27.66l-.02.18-.06.17-.08.17-.11.14a1 1 0 0 1-.66.27M8.81 17.58a1 1 0 0 1-.35-.07 1 1 0 0 1-.3-.2 1 1 0 0 1-.28-.66q0-.18.08-.35a1 1 0 0 1 .2-.3.97.97 0 0 1 1.31 0q.26.27.27.65 0 .37-.27.66a1 1 0 0 1-.66.27M12.07 17.58a1 1 0 0 1-.66-.27 1 1 0 0 1-.27-.66q0-.18.07-.35a1 1 0 0 1 .2-.3.97.97 0 0 1 1.32 0q.12.11.2.3.07.16.07.35 0 .37-.27.66a1 1 0 0 1-.66.27M15.33 17.58a1 1 0 0 1-.66-.27 1 1 0 0 1-.2-.3 1 1 0 0 1-.07-.36q0-.18.07-.35a1 1 0 0 1 .2-.3.9.9 0 0 1 1-.2l.18.08.14.11q.25.29.27.66c0 .24-.1.49-.27.66a1 1 0 0 1-.66.27M19.98 10H4.16a.7.7 0 0 1-.7-.7c0-.39.32-.7.7-.7h15.82c.38 0 .7.31.7.7a.7.7 0 0 1-.7.7"/>
            <path fill="currentColor" d="M15.8 22H8.34C4.95 22 3 20.05 3 16.65v-7.9c0-3.4 1.95-5.36 5.35-5.36h7.44c3.4 0 5.35 1.96 5.35 5.35v7.91c0 3.4-1.95 5.35-5.35 5.35M8.34 4.79Q4.38 4.78 4.4 8.74v7.91c0 2.66 1.29 3.95 3.95 3.95h7.44q3.97.02 3.95-3.95v-7.9c0-2.67-1.29-3.96-3.95-3.96z"/>
          </svg>
        </span>
      </div>

      {/* Отображаем ошибку от useForm */}
      {externalError && (
        <motion.span
          className={styles.errorMessage}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {externalError}
        </motion.span>
      )}

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            className={styles.calendarPopover}
            variants={calendarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.selectors}>
              <div className={styles.selectWrapper}>
                <select
                  value={currentMonth}
                  onChange={(e) => handleMonthChange(Number(e.target.value))}
                  className={styles.select}
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className={styles.selectWrapper}>
                <select
                  value={currentYear}
                  onChange={(e) => handleYearChange(Number(e.target.value))}
                  className={styles.select}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className={`${styles.weekDays} h-caption`}>
              {weekDays.map(day => (
                <span key={day} className={styles.weekDay}>{day}</span>
              ))}
            </div>

            <div className={styles.daysGrid}>
              {days.map((day) => {
                const isCurrentMonth = day.getMonth() === currentMonth;
                const isSelected = tempSelectedDate ? isSameDay(day, tempSelectedDate) : false;
                const isTodayDateFlag = isTodayDate(day);
                const isDisabled = isDateDisabled(day);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => handleDateSelect(day.getDate())}
                    disabled={isDisabled}
                    className={`
                      ${styles.dayButton}
                      ${!isCurrentMonth ? styles.otherMonth : ''}
                      ${isSelected ? styles.selected : ''}
                      ${isTodayDateFlag ? styles.today : ''}
                      ${isDisabled ? styles.disabled : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            <div className={styles.actionButtons}>
              <Button type='button' variant='outline' onClick={handleCancel}>
                Отменить
              </Button>
              <Button type='button' variant='prime' onClick={handleConfirm}>
                Выбрать
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DatePicker.displayName = 'DatePicker';