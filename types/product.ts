import {StaticImageData} from 'next/image';

export interface Product {
  object_id: string;
  brand_name: string;
  series_name: string;
  total_variant: number;
  is_active: number;
  created_at: Date;
}

export interface Variant {
  name: string;
  image: string | StaticImageData;
  is_active: number;
  created_at: Date;
  object_id: string;
}

export interface Comparison {
  brand: string;
  name: string;
  is_active: number;
  image: string | StaticImageData;
  created_at: Date;
  object_id: string;
  is_primary: number;
}
