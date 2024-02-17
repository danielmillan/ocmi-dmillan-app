import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Credentials } from '../types/Credentials';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import TextControl from '../components/ui/form/controls/text';
import PasswordControl from '../components/ui/form/controls/password';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AuthService } from '../services/auth.service';
import { useAppDispatch } from '../redux/hooks';
import { setAuthToken, setScope } from '../redux/slices/auth';

export default function Index() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const authFormSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('pages.form-validations.format.email'))
      .required(t('pages.form-validations.required.email')),
    password: Yup.string().required(
      t('pages.form-validations.required.password')
    ),
  });

  const submitForm = (credentials: Credentials) => {
    setLoading(true);
    AuthService.authenticate(credentials)
      .then((res) => {
        if (res) {
          dispatch(setAuthToken(res.token));
          dispatch(setScope(res.scope));
          router.push('/dashboard');
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authFormSchema,
    onSubmit: (data: Credentials) => {
      submitForm(data);
    },
  });

  return (
    <div className="auth-body">
      <div className="h-full flex justify-content-center align-items-center">
        <Card className="auth-box">
          <form onSubmit={formik.handleSubmit} className="p-fluid p-2">
            <div className="flex flex-column justify-content-center w-full">
              <div className="flex justify-content-center mb-4">
                <Image
                  src={'/images/Logo-banner.png'}
                  alt={'Logo'}
                  width={320}
                  height={120}
                />
              </div>
              <div className="w-full">
                <div>
                  <TextControl
                    label={t('labels.email')}
                    formik={formik}
                    name="email"
                    required
                    type="email"
                    autoFocus
                  />

                  <PasswordControl
                    label={t('labels.password')}
                    formik={formik}
                    name="password"
                    required
                  />
                </div>

                <Button
                  label={t('pages.login.buttons.submit')}
                  type="submit"
                  loading={loading}
                />
              </div>

              <div className="flex justify-content-center mt-3">
                <Link href="/forgot-password">
                  {t('labels.forgot-password')}
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
