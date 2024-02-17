import { Column } from 'primereact/column';
import { DataTableOptions } from '../../../../data/constants';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Employees } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

type AppTableColumn = {
    field: string;
    header: string;
    body?: (data: Employees) => React.JSX.Element
};

type AppTableProps = {
    actions?: (rowData: Employees) => ReactNode;
    columns: AppTableColumn[];
    data: any[];
    filters?: DataTableFilterMeta;
    globalFilterFields?: string[];
    loading: boolean;
};

export default function AppTable({
    actions,
    columns,
    data,
    filters,
    globalFilterFields,
    loading,
}: AppTableProps) {
    const { t } = useTranslation();

    return (
        <DataTable
            {...DataTableOptions}
            currentPageReportTemplate={t('table.currentPageTemplate')}
            emptyMessage={t('table.emptyMessage')}
            filters={filters}
            globalFilterFields={globalFilterFields}
            loading={!loading}
            value={data as []}
        >
            {columns.map((column, index: number) => (
                <Column key={index} field={column.field} header={column.header} body={column.body} />
            ))}
            {actions && <Column field="actions" header={t('table.actions')} body={actions} />}
        </DataTable>
    );
}
