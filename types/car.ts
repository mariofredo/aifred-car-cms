import {StaticImageData} from 'next/image';

export interface Spec {
  content: string;
  spec_name: string;
}

export interface Car {
  brand_name?: string;
  product_level_1_id?: number;
  product_level_1_name?: string;
  product_level_2_id?: number;
  product_level_2_name?: string;
  image?: null | StaticImageData | string;
  price?: null | string;
  specs?: Spec[];
}

export interface CompareForMoreCar {
  product_competitor: {
    id: number;
    image: null | StaticImageData | string;
    level_1_name: string;
    level_2_name: string;
    price: string;
    product_level_1_id: number;
    specs: Spec[];
  }[];
  product_level_2: {
    id: number;
    image: null | StaticImageData | string;
    level_1_name: string;
    name: string;
    price: string;
    product_level_1_id: number;
    specs: Spec[];
  };
}

export interface CompareCar {
  product_competitor: {
    id: number;
    image: null | StaticImageData | string;
    level_1_name: string;
    level_2_name: string;
    price: string;
    product_level_1_id: number;
    specs: Spec[];
  };
  product_level_2: {
    id: number;
    image: null | StaticImageData | string;
    level_1_name: string;
    name: string;
    price: string;
    product_level_1_id: number;
    specs: Spec[];
  };
}
