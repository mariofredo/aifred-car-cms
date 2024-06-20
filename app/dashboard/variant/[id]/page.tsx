'use client';

import {DefaultContainer} from '@/components';
import {useParams} from 'next/navigation';

export default function DashboardVariantList() {
  const {id} = useParams();
  return (
    <DefaultContainer title='Variant List'>
      <div></div>
    </DefaultContainer>
  );
}
