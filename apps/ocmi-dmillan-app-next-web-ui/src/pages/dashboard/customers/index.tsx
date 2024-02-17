import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Card } from 'primereact/card';
import AppTable from '../../../components/ui/common/Table';
import { useTranslation } from 'react-i18next';
import { CustomersService } from '../../../services/customers.service';

export default function CustomersDashboard() {
    const { t } = useTranslation();
    const [retrieveDataStatus, setRetrieveDataStatus] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const columns = [
        {
            field: 'id',
            header: t('table.headers.customers.id'),
        },
        {
            field: 'name',
            header: t('table.headers.customers.name'),
        },
        {
            field: 'address',
            header: t('table.headers.customers.address'),
        },
    ];

    useEffect(() => {
        if (!retrieveDataStatus) {
            CustomersService.getCustomers()
                .then((res) => {
                    if (res) {
                        setData(res);
                        setRetrieveDataStatus(true);
                    }
                })
                .catch(() => {
                    setRetrieveDataStatus(true);
                });
        }
    }, [retrieveDataStatus]);

    return (
        <Layout>
            <Card>
                <AppTable
                    columns={columns}
                    data={data}
                    loading={retrieveDataStatus}
                />
            </Card>
        </Layout>
    );
}