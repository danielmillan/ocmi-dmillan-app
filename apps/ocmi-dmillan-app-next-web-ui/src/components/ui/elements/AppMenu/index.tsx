import React from 'react';
import { AppSubmenu } from './AppSubmenu';
import { menu } from '../../../../data/menu';

export default function AppMenu({
  active,
  onRootMenuItemClick,
  mobileMenuActive,
  onMenuItemClick,
  layoutMode,
}: {
  active: any;
  onRootMenuItemClick: any;
  mobileMenuActive: any;
  onMenuItemClick: any;
  layoutMode: any;
}) {
  return (
    <AppSubmenu
      items={menu}
      className="layout-menu"
      menuActive={active}
      onRootMenuItemClick={onRootMenuItemClick}
      mobileMenuActive={mobileMenuActive}
      onMenuItemClick={onMenuItemClick}
      layoutMode={layoutMode}
      parentMenuItemActive
      root
    />
  );
}
