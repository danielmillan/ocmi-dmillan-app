import React from 'react';
import { classNames } from 'primereact/utils';
import { getFormErrorMessage, isFormFieldValid } from '../utils';
import { Dropdown } from 'primereact/dropdown';

export default function SelectControl({
    label,
    formik,
    name,
    options,
    optionLabel,
    needCustomHandleChange = false,
    customHandleChange,
    autoFocus = false,
    placeholder,
    required = false,
    valueTemplate,
    itemTemplate,
    disabled = false,
}: {
    label: string;
    formik: any;
    name: string;
    options: any[];
    optionLabel: string;
    customHandleChange?: (value: any) => void;
    needCustomHandleChange?: boolean;
    autoFocus?: boolean;
    placeholder: string;
    required?: boolean;
    valueTemplate?: any;
    itemTemplate?: any;
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
            <Dropdown
                id={name}
                name={name}
                onChange={
                    needCustomHandleChange ? customHandleChange : formik.handleChange
                }
                options={options}
                value={formik.values[name]}
                optionLabel={optionLabel}
                optionValue='id'
                placeholder={placeholder}
                filter
                valueTemplate={valueTemplate}
                itemTemplate={itemTemplate}
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {getFormErrorMessage(formik, name)}
        </div>
    );
}
