'use client';
import {DefaultContainer} from '@/components';
import {VariantForm} from '@/components/forms/variantForm';
import {Suspense} from 'react';

export default function DashboardVariantCreate() {
  return (
    <DefaultContainer title='Add New Variant'>
      <Suspense>
        <VariantForm />
      </Suspense>
    </DefaultContainer>
  );
}
