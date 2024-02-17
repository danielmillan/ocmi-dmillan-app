import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Card } from 'primereact/card';
import AppTable from '../../../components/ui/common/Table';
import { useTranslation } from 'react-i18next';
import { UsersService } from '../../../services/users.service';

export default function UsersDashboard() {
    const { t } = useTranslation();
    const [retrieveDataStatus, setRetrieveDataStatus] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const columns = [
        {
            field: 'id',
            header: t('table.headers.users.id'),
        },
        {
            field: 'name',
            header: t('table.headers.users.name'),
        },
        {
            field: 'email',
            header: t('table.headers.users.email'),
        },
        {
            field: 'role.name',
            header: t('table.headers.users.role'),
        },
    ];

    useEffect(() => {
        if (!retrieveDataStatus) {
            UsersService.getUsers()
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
