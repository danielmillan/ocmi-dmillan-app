import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../redux/hooks';
import { logoutApp } from '../redux/slices/auth';

export default function LogOut() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutApp());
    router.push('/');
  }, [router, dispatch]);

  return <Fragment></Fragment>;
}
