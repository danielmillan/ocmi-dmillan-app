

import React from 'react';
import { classNames } from 'primereact/utils';
import { isFormFieldValid, getFormErrorMessage } from '../utils';
import { InputNumber } from 'primereact/inputnumber';
import { FormikProps } from 'formik';

export default function NumberControl({
    label,
    formik,
    name,
    autoFocus = false,
    required = false,
    disabled = false,
}: {
    label: string;
    formik: FormikProps<any>;
    name: string;
    autoFocus?: boolean;
    required?: boolean;
    disabled?: boolean;
}) {
    return (
        <div className='flex flex-column mb-3'>
            <label
                htmlFor={name}
                className={classNames({
                    'p-error': isFormFieldValid(formik, name),
                    required: required,
                })}
            >
                {label}
            </label>
            <InputNumber
                id={name}
                name={name}
                onChange={(e) => formik.setFieldValue(name, e.value)}
                value={formik.values[name]}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            {getFormErrorMessage(formik, name)}
        </div>
    );
}

