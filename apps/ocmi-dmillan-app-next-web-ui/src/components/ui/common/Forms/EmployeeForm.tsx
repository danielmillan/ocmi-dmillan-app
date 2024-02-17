import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Prisma,
    Employees,
} from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import TextControl from '../../form/controls/text';
import { useTranslation } from 'react-i18next';
import NumberControl from '../../form/controls/number';
import { useAppSelector } from '../../../../redux/hooks';
import { selectScope } from '../../../../redux/slices/auth';
import SelectControl from '../../form/controls/select';
import { Button } from 'primereact/button';
import { EmployeesService } from '../../../../services/employees.service';
import { CustomersService } from '../../../../services/customers.service';
import { useToastContext } from '../../elements/Toast';

type EmployeeFormProps = {
    isEdited: boolean;
    data?: Prisma.EmployeesUncheckedCreateInput | null;
    resetForm: () => void;
};

export default function EmployeeForm({
    isEdited,
    data,
    resetForm,
}: EmployeeFormProps) {
    const [customers, setCustomers] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [loadCatalogs, setLoadCatalogs] = useState(false);
    const [loading, setLoading] = useState(false);
    const scope = useAppSelector(selectScope);
    const { showToast } = useToastContext();
    const { t } = useTranslation();

    useEffect(() => {
        if (!loadCatalogs) {
            Promise.all([
                CustomersService.getCustomers(),
                EmployeesService.getPaymentTypes(),
            ]).then(([customersResponse, paymentTypesResponse]) => {
                customersResponse && setCustomers(customersResponse);
                paymentTypesResponse && setPaymentTypes(paymentTypesResponse);
                setLoadCatalogs(true);
            });
        }
    }, [loadCatalogs]);

    const employeeFormSchema = Yup.object().shape({
        name: Yup.string().required(t('forms.required-validation')),
        lastName: Yup.string().required(t('forms.required-validation')),
        customerId: Yup.number().min(1, t('forms.select-validation')),
        paymentType: Yup.number().min(1, t('forms.select-validation')),
        paymentAmount: Yup.number().min(1, t('forms.required-validation')),
    });

    const sumbitForm = (employee: Prisma.EmployeesUncheckedCreateInput) => {
        setLoading(true);
        if (isEdited) {
            EmployeesService.updateEmployee(String(data!.id), employee)
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        showToast({
                            severity: 'success',
                            summary: 'OK',
                            detail: t('forms.notifications.success'),
                        });
                        formik.resetForm();
                        resetForm();
                    }
                })
                .catch((error) => {
                    showToast({
                        severity: 'error',
                        summary: 'ERROR',
                        detail: error.message,
                    });
                    setLoading(false);
                });
        } else {
            EmployeesService.createEmployee(employee)
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        showToast({
                            severity: 'success',
                            summary: 'OK',
                            detail: t('forms.notifications.success'),
                        });
                        formik.resetForm();
                        resetForm();
                    }
                })
                .catch((error) => {
                    showToast({
                        severity: 'error',
                        summary: 'ERROR',
                        detail: error.message,
                    });
                    setLoading(false);
                });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: isEdited ? data!.name : '',
            lastName: isEdited ? data!.lastName : '',
            customerId: isEdited ? data!.customerId : 0,
            paymentType: isEdited ? data!.paymentType : 0,
            paymentAmount: isEdited ? data!.paymentAmount : BigInt(0),
        },
        validationSchema: employeeFormSchema,
        onSubmit: (data: Prisma.EmployeesUncheckedCreateInput) => {
            sumbitForm(data);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-3">
            <div>
                <TextControl
                    label={t('forms.employees.name')}
                    formik={formik}
                    name="name"
                    required
                    type="name"
                    autoFocus
                />

                <TextControl
                    label={t('forms.employees.lastName')}
                    formik={formik}
                    name="lastName"
                    required
                    type="lastName"
                />

                {scope === 'OPERATION' ? (
                    <SelectControl
                        label={t('forms.employees.customer')}
                        name="customerId"
                        formik={formik}
                        options={customers}
                        optionLabel="name"
                        placeholder={t('forms.employees.customer-ph')}
                        required
                    />
                ) : (
                    <></>
                )}

                <SelectControl
                    label={t('forms.employees.paymentType')}
                    name="paymentType"
                    formik={formik}
                    options={paymentTypes}
                    optionLabel="value"
                    placeholder={t('forms.employees.paymentType-ph')}
                    required
                />

                <NumberControl
                    label={t('forms.employees.paymentAmount')}
                    formik={formik}
                    name="paymentAmount"
                    required
                />

                <Button
                    className="w-full"
                    label={
                        isEdited
                            ? t('forms.employees.button-edit')
                            : t('forms.employees.button-create')
                    }
                    type="submit"
                    loading={loading}
                />
            </div>
        </form>
    );
}
