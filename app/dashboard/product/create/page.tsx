'use client';
import {DefaultContainer, ProductForm} from '@/components';
import {Suspense} from 'react';

export default function AddProduct() {
  return (
    <DefaultContainer title='Add Product'>
      <Suspense fallback={<>Loading...</>}>
        <ProductForm type={'addProduct'} params={{}} />
      </Suspense>
    </DefaultContainer>
  );
}
