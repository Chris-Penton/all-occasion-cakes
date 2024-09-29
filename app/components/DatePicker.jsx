import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isBefore, addDays } from 'date-fns';

export function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef(null);

  const X = 7; // Number of days from today

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const formatDate = (date) => {
    return format(date, 'EEE dd MMM yyyy');
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the date picker
  };

  const disabledDatesArray = [
    '2024-06-12',
    '2024-05-18',
    '2024-06-19',
    '2024-06-29',
  ];

  const modifiers = {
    disabled: (date) =>
      isBefore(date, new Date()) ||
      isBefore(date, addDays(new Date(), X)) ||
      disabledDatesArray.includes(format(date, 'yyyy-MM-dd')),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="relative" ref={datepickerRef}>
        <input
          type="text"
          readOnly
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none"
          value={selectedDate ? formatDate(selectedDate) : ''}
          onClick={toggleDatePicker}
          placeholder="Select a date"
        />
        {isOpen && (
          <div className="absolute top-full left-0">
            <DayPicker
              mode="single"
              className="bg-white border border-gray-300 rounded-md shadow-sm p-4"
              selected={selectedDate}
              onDayClick={handleDayClick}
              modifiers={modifiers}
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyDatePicker;
