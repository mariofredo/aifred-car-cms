export const MENU_ITEMS = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
  {
    title: 'Submission',
    path: '/dashboard/submission',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
  {
    title: 'Product',
    path: '/dashboard/product',
    type: 'normal',
    icon: '',
    subMenu: [
      {
        subMenuTitle: 'Add Product',
        path: '/dashboard/product/create',
      },
      {
        subMenuTitle: 'Product Library',
        path: '/dashboard/product',
      },
    ],
  },
  // {
  //   title: 'Product',
  //   path: '',
  //   type: 'list',
  //   icon: '',
  //   subMenu: [
  //     {
  //       subMenuTitle: 'Add Product',
  //       path: '/dashboard/product/create',
  //     },
  //     {
  //       subMenuTitle: 'Product Library',
  //       path: '/dashboard/product',
  //     },
  //   ],
  // },
  {
    title: 'Question',
    path: '/dashboard/question',
    icon: '',
    type: 'normal',
    subMenu: [
      {
        subMenuTitle: 'Add Question',
        path: '/dashboard/question/create',
      },
      {
        subMenuTitle: 'Question Library',
        path: '/dashboard/question',
      },
    ],
  },
  // {
  //   title: 'Question',
  //   path: '',
  //   icon: '',
  //   type: 'list',
  //   subMenu: [
  //     {
  //       subMenuTitle: 'Add Question',
  //       path: '/dashboard/question/create',
  //     },
  //     {
  //       subMenuTitle: 'Question Library',
  //       path: '/dashboard/question',
  //     },
  //   ],
  // },
  // {
  //   title: 'Plans',
  //   path: '/dashboard/plans',
  //   icon: '',
  //   type: 'normal',
  //   subMenu: [],
  // },
  {
    title: 'User Management',
    path: '/dashboard/userManagement',
    icon: '',
    type: 'normal',
    subMenu: [],
  },
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
