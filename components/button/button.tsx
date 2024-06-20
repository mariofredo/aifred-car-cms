import Image, {StaticImageData} from 'next/image';
import React, {ChangeEvent, useCallback} from 'react';
import '@/styles/button.scss';
interface ButtonProps {
  type?: string;
  image?: string | StaticImageData;
  text?: string;
  borderRadius?: string;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  padding?: string;
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  type = 'solid',
  image,
  text,
  borderRadius,
  bgColor,
  color,
  borderColor,
  padding,
  disabled,
  width = 'auto',
  onClick,
}: ButtonProps) {
  const style = useCallback((type: string) => {
    switch (type) {
      case 'solid':
        return {
          borderRadius,
          backgroundColor: bgColor,
          color,
          padding,
          width,
        };
      case 'outline':
        return {
          borderRadius,
          backgroundColor: bgColor,
          color,
          padding,
          border: `1.5px solid ${borderColor}`,
          width,
        };

      default:
        return {
          borderRadius,
          backgroundColor: bgColor,
          color,
          padding,
          width,
        };
    }
  }, []);
  return (
    <button
      style={style(type)}
      className='button_style'
      disabled={disabled}
      onClick={onClick}
    >
      {image && <Image src={image} width={20} height={20} alt='button_image' />}
      {text}
    </button>
  );
}
