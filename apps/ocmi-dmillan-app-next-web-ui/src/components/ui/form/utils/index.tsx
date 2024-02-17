import { FormikProps } from "formik";

export const isFormFieldValid = (formik: FormikProps<any>, name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

export const getFormErrorMessage = (formik: FormikProps<any>, name: string) => {
    return (
        isFormFieldValid(formik, name) && (
            <small className="p-error">{String(formik.errors[name])}</small>
        )
    );
};
