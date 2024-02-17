import { DataTableProps } from 'primereact/datatable';

export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  ROLES: '/roles',
  CUSTOMERS: '/customers',
  EMPLOYEES: '/employees',
};

export const DataTableOptions: DataTableProps<never[]> = {
  paginator: true,
  responsiveLayout: 'stack',
  paginatorTemplate:
    'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  rows: 10,
  rowsPerPageOptions: [10, 20, 50],
  breakpoint: '950px',
};
