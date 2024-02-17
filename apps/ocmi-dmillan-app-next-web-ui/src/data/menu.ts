export const menu = [
  { label: 'menu.home', icon: 'pi pi-home', to: '/dashboard/home' },
  { label: 'menu.customers', icon: 'pi pi-user', to: '/dashboard/customers' },
  {
    label: 'menu.employees',
    icon: 'pi pi-briefcase',
    to: '/dashboard/employees',
  },
  { label: 'menu.timesheets', icon: 'pi pi-file', to: '/dashboard/timesheets' },
  {
    label: 'menu.config',
    icon: 'pi pi-cog',
    items: [
      { label: 'menu.roles', icon: 'pi pi-list', to: '/dashboard/roles' },
      { label: 'menu.users', icon: 'pi pi-users', to: '/dashboard/users' },
    ],
  },
];
