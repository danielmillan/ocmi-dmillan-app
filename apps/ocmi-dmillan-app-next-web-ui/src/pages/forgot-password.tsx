import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Credentials } from '../types/Credentials';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import TextControl from '../components/ui/form/controls/text';
import { useTranslation } from "react-i18next";
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const authFormSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('pages.forgot.form-validations.format.email'))
      .required(t('pages.forgot.form-validations.required.email'))
  });

  const submitForm = (credentials: Credentials) => {
    console.log(credentials);
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: authFormSchema,
    onSubmit: (data: Credentials) => {
      submitForm(data);
    },
  });

  return (
    <div className="auth-body">
      <div className="h-full flex justify-content-center align-items-center">
        <Card className='w-25rem'>
          <form onSubmit={formik.handleSubmit} className="p-fluid p-2">
            <div className="flex flex-column justify-content-center w-full">
              <div >

              </div>
              <div className='w-full'>
                <div>
                  <TextControl
                    label={t('labels.email')}
                    formik={formik}
                    name="email"
                    required
                    type="email"
                    autoFocus
                  />

                </div>

                <Button
                  label={t('pages.forgot.buttons.submit')}
                  type="submit"
                  loading={loading}
                />
              </div>

              <div className='flex justify-content-center mt-3'>
                <Link href="/">
                  {t('labels.login')}
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
