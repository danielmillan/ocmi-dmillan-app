

import React from 'react';
import { classNames } from 'primereact/utils';
import { isFormFieldValid, getFormErrorMessage } from '../utils';
import { InputText } from 'primereact/inputtext';
import { FormikProps } from 'formik';

export default function TextControl({
    label,
    formik,
    name,
    type = 'text',
    autoFocus = false,
    required = false,
    disabled = false,
}: {
    label: string;
    formik: FormikProps<any>;
    name: string;
    type?: string;
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
            <InputText
                id={name}
                name={name}
                type={type}
                onChange={formik.handleChange}
                value={formik.values[name]}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            {getFormErrorMessage(formik, name)}
        </div>
    );
}

