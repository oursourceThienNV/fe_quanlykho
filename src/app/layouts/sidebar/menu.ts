import { MenuItem } from './menu.model';
export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Cấu hình ',
    icon: 'bx-home-circle',
    subItems: [
      {
        id: 6,
        label: 'Báo cáo thống kê',
        link: '/pages/category/report',
        parentId: 1
      },
     {
        id: 6,
        label: 'Quản lý người dùng',
        link: '/pages/category/users',
        parentId: 1
      },
      {
        id: 6,
        label: 'Quản lý đơn đăng ký',
        link: '/pages/category/register-form',
        parentId: 1
      }
    ]
  }
];


