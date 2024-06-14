import { MenuItem } from './menu.model';
export const MENU_ADMIN: MenuItem[] = [
  {
    id: 1,
    label: 'Cấu hình ',
    icon: 'bx-home-circle',
    subItems: [
     {
        id: 6,
        label: 'Quản lý người dùng',
        link: '/pages/category/users',
        parentId: 1
      }
    ]
  }
];

export const MENU_INVESTOR: MenuItem[] = [
  {
    id: 1,
    label: 'Cấu hình ',
    icon: 'bx-home-circle',
    subItems: [
      {
        id: 6,
        label: 'Quản lý thông tin cá nhân',
        link: '/pages/category/users',
        parentId: 1
      },
      {
        id: 7,
        label: 'Quản lý NCC',
        link: '/pages/category/provider',
        parentId: 1
      }
    ]
  },
  {
    id: 10,
    label: 'Quản lý hoạt động',
    icon: 'bxs-shopping-bag',
    subItems: [
      {
        id: 11,
        label: 'Quản lý sản phẩm',
        link: '/pages/category/product',
        parentId: 10
      },
      {
        id: 11,
        label: 'Quản lý nhập kho',
        link: '/pages/category/import-house',
        parentId: 10
      }
      ,
      {
        id: 12,
        label: 'Quản lý xuất kho',
        link: '/pages/category/export-house',
        parentId: 10
      }

    ]
  }
];


