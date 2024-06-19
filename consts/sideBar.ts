export const MENU_ITEMS = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
  {
    title: 'Product',
    path: '',
    type: 'list',
    icon: '',
    subMenu: [
      {
        subMenuTitle: 'Add Product',
        path: '/dashboard/product/addProduct',
      },
      {
        subMenuTitle: 'Product Library',
        path: '/dashboard/product',
      },
    ],
  },
  {
    title: 'Question',
    path: '',
    icon: '',
    type: 'list',
    subMenu: [
      {
        subMenuTitle: 'Add Question',
        path: '/dashboard/question/addQuestion',
      },
      {
        subMenuTitle: 'Question Library',
        path: '/dashboard/question',
      },
    ],
  },
  // {
  //   title: 'Plans',
  //   path: '/dashboard/plans',
  //   icon: '',
  //   type: 'normal',
  //   subMenu: [],
  // },
  {
    title: 'My Account',
    path: '/dashboard/account',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
  {
    title: 'Logout',
    path: '/login',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
];
