'use client';
import {useEffect, useState} from 'react';
import {DateRangePicker, Range, RangeKeyDict} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@/styles/dateRange.scss';
import {formatDateUI} from '@/utils';
interface DateRangeProps {
  dateRange: [Range];
  label: string;
  onChange: (item: RangeKeyDict) => void;
}
export default function DateRange({
  dateRange,
  label,
  onChange,
}: DateRangeProps) {
  const [showDate, setShowDate] = useState(false);
  return (
    <div className='date_range_ctr'>
      {label && <p className='date_range_label'>{label}</p>}
      <div
        className='date_range_date'
        onClick={() => setShowDate((prev) => !prev)}
      >
        {formatDateUI(dateRange[0].startDate, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
        {' - '}
        {formatDateUI(dateRange[0].endDate, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      {showDate && (
        <div className='date_range_wrapper'>
          <DateRangePicker
            date={new Date()}
            ranges={dateRange}
            onChange={onChange}
            showPreview={true}
            moveRangeOnFirstSelection={false}
          />
        </div>
      )}
    </div>
  );
}
