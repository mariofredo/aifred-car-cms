'use client';
import {ComparisonForm, DefaultContainer} from '@/components';

export default function DashboardComparisonCreate() {
  return (
    <DefaultContainer title='Add Comparison Product'>
      <ComparisonForm type='create' />
    </DefaultContainer>
  );
}
