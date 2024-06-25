'use client';
import {DefaultContainer, ProductForm} from '@/components';
import {Suspense} from 'react';

export default function DashboardProductDetail() {
  return (
    <DefaultContainer title={'Edit Product'}>
      <Suspense fallback={<>Loading...</>}>
        <ProductForm type={'edit'} params={{}} />
      </Suspense>
    </DefaultContainer>
  );
}
