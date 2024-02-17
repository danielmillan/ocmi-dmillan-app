import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Card } from 'primereact/card';
import AppTable from '../../../components/ui/common/Table';
import { useTranslation } from 'react-i18next';
import { RolesService } from '../../../services/roles.service';

export default function RolesDashboard() {
    const { t } = useTranslation();
    const [retrieveDataStatus, setRetrieveDataStatus] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const columns = [
        {
            field: 'id',
            header: t('table.headers.roles.id'),
        },
        {
            field: 'name',
            header: t('table.headers.roles.name'),
        },
    ];

    useEffect(() => {
        if (!retrieveDataStatus) {
            RolesService.getRoles()
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