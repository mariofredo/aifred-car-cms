import React from 'react';
// interface CardProps {
//   image: string | StaticImageData;
//   title?: string;
//   type?: string;
//   price?: string;
//   capacity?: string;
//   city?: string;
//   purpose?: string;
// }
import '@/styles/card.scss';
import Image, {StaticImageData} from 'next/image';
import {Car} from '@/types';
export default function Card({
  image,
  price,
  brand_name,
  product_level_1_id,
  product_level_1_name,
  product_level_2_id,
  product_level_2_name,
}: Car) {
  return (
    <div className='card_ctr'>
      <div className='card_image_ctr'>
        <Image src={image} alt={'card_img'} width={100} height={100} />
      </div>
      <div className='card_body'>
        <div className='card_title'>
          {product_level_1_name}
          <br />
          {product_level_2_name}
        </div>
        <div className='card_attribute'>
          {/* <div className='card_type'>{type}</div> */}
          <div className='card_price'>{price}</div>
          {/* <div className='card_price'>{formatPrice(price)}</div> */}
        </div>
      </div>
    </div>
  );
}
