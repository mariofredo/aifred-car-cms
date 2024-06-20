'use client';
import {DefaultContainer, ProductForm} from '@/components';
import {Suspense} from 'react';

export default function DashboardProductDetail() {
  return (
    <DefaultContainer title={'Detail Product'}>
      <Suspense fallback={<>Loading...</>}>
        <ProductForm type={'detailProduct'} params={{}} />
      </Suspense>
    </DefaultContainer>
  );
}
