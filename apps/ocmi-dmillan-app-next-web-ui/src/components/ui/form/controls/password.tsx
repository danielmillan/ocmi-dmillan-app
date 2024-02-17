import React from 'react';
import { classNames } from 'primereact/utils';
import { isFormFieldValid, getFormErrorMessage } from '../utils';
import { Password } from 'primereact/password';
import { FormikProps } from 'formik';

export default function PasswordControl({
    label,
    formik,
    name,
    feedback = false,
    autoFocus = false,
    required = false,
    disabled = false,
}: {
    label: string;
    formik: FormikProps<any>;
    name: string;
    feedback?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    disabled?: boolean;
}) {
    return (
        <div className="flex flex-column mb-3">
            <label
                htmlFor={name}
                className={classNames({
                    'p-error': isFormFieldValid(formik, name),
                    required: required,
                })}
            >
                {label}
            </label>
            <Password
                id={name}
                name={name}
                onChange={formik.handleChange}
                value={formik.values[name]}
                disabled={disabled}
                autoFocus={autoFocus}
                toggleMask
                feedback={feedback}
            />
            {getFormErrorMessage(formik, name)}
        </div>
    );
}