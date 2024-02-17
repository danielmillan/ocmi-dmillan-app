import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAuthToken,
  setUserInfo,
  setUserPermissions,
} from '../../redux/slices/auth';
import { AuthService } from '../../services/auth.service';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function AuthGuard(WrappedComponent: AppProps['Component']) {
  return (props: any) => {
    const [isLogged, setIsLogged] = useState(false);
    const token = useAppSelector(selectAuthToken);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
      if (token) {
        AuthService.validateSession()
          .then((res) => {
            if (res) {
              dispatch(setUserInfo(res.userInfo));
              dispatch(setUserPermissions(res.permissions));
              setIsLogged(true);
            }
          })
          .catch(() => {
            router.push('/logout');
          });
      } else {
        router.push('/logout');
      }
    }, [token, dispatch, router]);

    if (isLogged) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <div className="flex justify-content-center">
          <ProgressSpinner />
        </div>
      );
    }
  };
}
