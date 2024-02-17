import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { Card } from 'primereact/card';
import AppTable from '../../../components/ui/common/Table';
import { useTranslation } from 'react-i18next';
import { EmployeesService } from '../../../services/employees.service';
import {
    Employees,
    Prisma,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from 'primereact/button';
import FormDialog from '../../../components/ui/form/dialog';
import EmployeeForm from '../../../components/ui/common/Forms/EmployeeForm';
import { useToastContext } from '../../../components/ui/elements/Toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function EmployeesDashboard() {
    const { t } = useTranslation();
    const [showDialog, setShowDialog] = useState(false);
    const [retrieveDataStatus, setRetrieveDataStatus] = useState(false);
    const [selectedRow, setSelectedRow] =
        useState<Prisma.EmployeesUncheckedCreateInput | null>(null);
    const [data, setData] = useState<any[]>([]);
    const { showToast } = useToastContext();
    const columns = [
        {
            field: 'id',
            header: t('table.headers.employees.id'),
        },
        {
            field: 'name',
            header: t('table.headers.employees.name'),
        },
        {
            field: 'lastName',
            header: t('table.headers.employees.lastName'),
        },
        {
            field: 'payment.value',
            header: t('table.headers.employees.paymentType'),
        },
        {
            field: 'paymentAmount',
            header: t('table.headers.employees.paymentAmount'),
            body: (data: Employees) => (
                <span>{formatCurrency(Number(data.paymentAmount))}</span>
            ),
        },
    ];

    useEffect(() => {
        if (!retrieveDataStatus) {
            EmployeesService.getEmployees()
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

    const confirmDeletePopup = (event: any) => {
        confirmDialog({
            message: t('forms.confirmation.content'),
            header: t('forms.confirmation.header'),
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: () => deleteEmployee(event),
        });
    };

    const deleteEmployee = (data: Employees) => {
        EmployeesService.deleteEmployee(String(data.id))
            .then((res) => {
                if (res) {
                    showToast({
                        severity: 'success',
                        summary: 'OK',
                        detail: t('forms.notifications.success'),
                    });
                    setRetrieveDataStatus(false);
                }
            })
            .catch((error) => {
                showToast({
                    severity: 'error',
                    summary: 'ERROR',
                    detail: error.message,
                });
            });
    };

    const handleEdit = (data: any) => {
        setSelectedRow({
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            customerId: data.customer.id,
            paymentType: data.payment.id,
            paymentAmount: data.paymentAmount,
        });
        setShowDialog(true);
    };

    const actionsBody = (rowData: Employees) => (
        <>
            <Button
                tooltip={t('tooltips.edit')}
                tooltipOptions={{ position: 'bottom' }}
                icon="pi pi-pencil"
                onClick={() => handleEdit(rowData)}
                aria-label="Filter"
                severity="info"
                rounded
                outlined
            />

            <Button
                className="ml-3"
                tooltip={t('tooltips.delete')}
                tooltipOptions={{ position: 'bottom' }}
                icon="pi pi-trash"
                onClick={() => confirmDeletePopup(rowData)}
                aria-label="Filter"
                severity="danger"
                rounded
                outlined
            />
        </>
    );

    const handleResetForm = () => {
        setShowDialog(false);
        setRetrieveDataStatus(false);
        selectedRow && setSelectedRow(null);
    };

    return (
        <Layout>
            <Card>
                <div>
                    <div className="mb-3">
                        <Button
                            label={t('button-actions.create-employee')}
                            onClick={() => setShowDialog(true)}
                        />
                    </div>
                    <AppTable
                        columns={columns}
                        data={data}
                        loading={retrieveDataStatus}
                        actions={actionsBody}
                    />

                    <FormDialog
                        title={selectedRow ? t('button-actions.edit-employee') : t('button-actions.create-employee')}
                        handleClose={setShowDialog}
                        visibleDialog={showDialog}
                    >
                        <EmployeeForm
                            isEdited={selectedRow ? true : false}
                            data={selectedRow}
                            resetForm={handleResetForm}
                        />
                    </FormDialog>
                </div>

                <ConfirmDialog />
            </Card>
        </Layout>
    );
}
