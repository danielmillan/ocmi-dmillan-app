import Image from 'next/image';
import React from 'react';

export default function AppFooter() {
  return (
    <div className="layout-footer">
      <div>
        <Image src="/images/Logo.png" alt="logo" width={30} height={60} />
        <p>Easy Pay - Payrolls</p>
      </div>
    </div>
  );
}
