'use client';
import {DefaultContainer, ComparisonForm} from '@/components';

export default function DashboardComparisonEdit() {
  return (
    <DefaultContainer title='Edit Comparison Product'>
      <ComparisonForm type='edit' />
    </DefaultContainer>
  );
}
