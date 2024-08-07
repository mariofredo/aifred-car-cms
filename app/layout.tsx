import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {
  BrandContextProvider,
  ModalContextProvider,
  ProductContextProvider,
  QuestionContextProvider,
  SpecParamContextProvider,
  VariantContextProvider,
  ComparisonContextProvider,
} from '@/context';
import '@/public/fonts/Manrope/manrope.scss';
import '@/public/fonts/Montserrat/montserrat.scss';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'AiFRED',
  description: 'PT Salindo Berlian Motor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QuestionContextProvider>
          <ComparisonContextProvider>
            <VariantContextProvider>
              <ProductContextProvider>
                <BrandContextProvider>
                  <SpecParamContextProvider>
                    <ModalContextProvider>{children}</ModalContextProvider>
                  </SpecParamContextProvider>
                </BrandContextProvider>
              </ProductContextProvider>
            </VariantContextProvider>
          </ComparisonContextProvider>
        </QuestionContextProvider>
      </body>
    </html>
  );
}
