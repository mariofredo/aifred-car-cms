const base_url = process.env.NEXT_PUBLIC_API_URL;
export const API_ROUTES = {
  product_list: base_url + '/product',
  product_create: base_url + '/product/store',
  product_detail: base_url + '/product',
  product_update: base_url + '/product/update',
  product_delete: base_url + '/product/delete',
  variant_list: (id: string) => base_url + `/product/${id}/variant`,
  variant_create: (id: string) => base_url + `/product/${id}/variant/store`,
  variant_detail: (id: string, variantId: string) =>
    base_url + `/product/${id}/variant/${variantId}`,
  variant_update: (id: string) => base_url + `/product/${id}/variant/update`,
  variant_delete: (id: string) => base_url + `/product/${id}/variant/delete`,
  comparison_list: (id: string) => base_url + `/product/${id}/competitor`,
  comparison_create: (id: string) =>
    base_url + `/product/${id}/competitor/store`,
  comparison_detail: (id: string, variantId: string) =>
    base_url + `/product/${id}/competitor/${variantId}`,
  comparison_update: (id: string) =>
    base_url + `/product/${id}/competitor/update`,
  comparison_delete: (id: string) =>
    base_url + `/product/${id}/competitor/delete`,
  comparison_update_main_comparison: (id: string) =>
    base_url + `/product/${id}/competitor/main-comparison`,
  tag_list: base_url + '/tag',
  spec_category_list: base_url + '/spec',
  question_list: base_url + '/question',
  question_create: base_url + '/question/store',
  question_detail: (id: string) => base_url + `/question/${id}`,
  question_update: base_url + `/question/update`,
};
