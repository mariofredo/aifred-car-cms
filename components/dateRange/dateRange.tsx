'use client';
import React from 'react';
import {Calendar, Range} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
interface DateRangeProps {
  startDate: string;
  endDate: string;
  key: string;
  onChange: (date: Date) => {};
}
export default function DateRange({
  startDate,
  endDate,
  key,
  onChange,
}: DateRangeProps) {
  return (
    <div>
      <Calendar
        dragSelectionEnabled
        ranges={[
          {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: key,
          },
        ]}
        onChange={onChange}
        showMonthAndYearPickers={false}
      />
    </div>
  );
}
