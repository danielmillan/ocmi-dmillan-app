import React, { ReactElement, useState } from 'react';
import { classNames } from 'primereact/utils';
import AppTopbar from '../../components/ui/elements/AppTopbar';
import AppRightMenu from '../../components/ui/elements/AppRightMenu';
import AppFooter from '../../components/ui/elements/AppFooter';
import AppMenu from '../../components/ui/elements/AppMenu';
import AuthGuard from '../auth/guard';

type LayoutProps = {
  children: ReactElement;
};

function Layout({ children }: LayoutProps) {
  const [layoutMode] = useState('horizontal');
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);  
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [activeTopbarItem, setActiveTopbarItem] = useState(null);
  const [rightPanelMenuActive, setRightPanelMenuActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] =
    useState(false);
  const [configActive, setConfigActive] = useState(false);
  const [topbarColor] = useState('layout-topbar-green');
  const [inputStyle] = useState('filled');
  const [ripple] = useState(false);
  const [isRTL] = useState(false);

  let topbarItemClick: any;
  let menuClick: any;
  let rightMenuClick: any;
  let userMenuClick: any;
  let configClick = false;

  const layoutClassName = classNames(
    'layout-wrapper',
    {
      'layout-horizontal': layoutMode === 'horizontal',
      'layout-overlay': layoutMode === 'overlay',
      'layout-static': layoutMode === 'static',
      'layout-slim': layoutMode === 'slim',
      'layout-menu-light': true,
      'layout-menu-dark': false,
      'layout-overlay-active': overlayMenuActive,
      'layout-mobile-active': staticMenuMobileActive,
      'layout-static-inactive': staticMenuDesktopInactive,
      'layout-rtl': isRTL,
      'p-input-filled': inputStyle === 'filled',
      'p-ripple-disabled': !ripple,
    },
    topbarColor
  );

  const isDesktop = () => {
    return window.innerWidth > 896;
  };

  const isMobile = () => {
    return window.innerWidth <= 1025;
  };

  const isHorizontal = () => {
    return layoutMode === 'horizontal';
  };

  const isSlim = () => {
    return layoutMode === 'slim';
  };

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  };

  const onRightMenuClick = () => {
    rightMenuClick = true;
  };

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false);
    setStaticMenuMobileActive(false);
  };

  const onDocumentClick = () => {
    if (!topbarItemClick) {
      setActiveTopbarItem(null);
    }
    if (!rightMenuClick) {
      setRightPanelMenuActive(false);
    }
    if (!userMenuClick && isSlim() && !isMobile()) {
    }
    if (!menuClick) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false);
      }
      if (overlayMenuActive || staticMenuMobileActive) {
        hideOverlayMenu();
      }
      unblockBodyScroll();
    }
    if (configActive && !configClick) {
      setConfigActive(false);
    }
    topbarItemClick = false;
    menuClick = false;
    rightMenuClick = false;
    userMenuClick = false;
    configClick = false;
  };

  const onRightMenuButtonClick = (event: any) => {
    rightMenuClick = true;
    setRightPanelMenuActive(
      (prevRightPanelMenuActive) => !prevRightPanelMenuActive
    );
    hideOverlayMenu();
    event.preventDefault();
  };

  const onMenuButtonClick = (event: any) => {
    menuClick = true;
    setRightPanelMenuActive(false);
    if (layoutMode === 'overlay') {
      setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
    }
    if (isDesktop())
      setStaticMenuDesktopInactive(
        (prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive
      );
    else {
      setStaticMenuMobileActive(
        (prevStaticMenuMobileActive) => !prevStaticMenuMobileActive
      );
      if (staticMenuMobileActive) {
        blockBodyScroll();
      } else {
        unblockBodyScroll();
      }
    }
    event.preventDefault();
  };

  const onTopbarItemClick = (event: any) => {
    topbarItemClick = true;
    if (activeTopbarItem === event.item) setActiveTopbarItem(null);
    else setActiveTopbarItem(event.item);
    event.originalEvent.preventDefault();
  };

  const onMenuClick = () => {
    menuClick = true;
  };

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      hideOverlayMenu();
    }
    if (!event.item.items && (isHorizontal() || isSlim())) {
      setMenuActive(false);
    }
  };

  const onRootMenuItemClick = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  return (
    <div className={layoutClassName} onClick={onDocumentClick}>
      <AppTopbar
        activeTopbarItem={activeTopbarItem}        
        onRightMenuButtonClick={onRightMenuButtonClick}
        onMenuButtonClick={onMenuButtonClick}
        onTopbarItemClick={onTopbarItemClick}
      />

      <AppRightMenu
        rightPanelMenuActive={rightPanelMenuActive}
        onRightMenuClick={onRightMenuClick}
      ></AppRightMenu>

      <div
        style={{ zIndex: '1' }}
        className="layout-menu-container"
        onClick={onMenuClick}
      >
        <AppMenu
          onMenuItemClick={onMenuItemClick}
          onRootMenuItemClick={onRootMenuItemClick}
          layoutMode={layoutMode}
          active={menuActive}
          mobileMenuActive={staticMenuMobileActive}
        />
      </div>

      <div className="layout-main">
        <div className="layout-content">{children}</div>
        <AppFooter />
      </div>
    </div>
  );
}

export default AuthGuard(Layout);
