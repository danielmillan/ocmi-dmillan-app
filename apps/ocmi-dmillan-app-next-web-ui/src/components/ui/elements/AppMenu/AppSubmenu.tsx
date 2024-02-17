import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { classNames } from 'primereact/utils';
import { CSSTransition } from 'react-transition-group';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const AppSubmenu = forwardRef((props: any, ref: any) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();

  const onMenuItemClick = (event: any, item: any, index: any) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
      event.preventDefault();
    }
    if (item.items) {
      event.preventDefault();
    }
    if (props.root) {
      props.onRootMenuItemClick({
        originalEvent: event,
      });
    }
    if (item.items) {
      setActiveIndex(index === activeIndex ? null : index);
    }
    props.onMenuItemClick({
      originalEvent: event,
      item: item,
    });
  };

  const onMenuItemMouseEnter = (index: any) => {
    if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(index);
    }
  };

  const isMobile = () => {
    return window.innerWidth <= 1025;
  };

  const isHorizontalOrSlim = useCallback(() => {
    return props.layoutMode === 'horizontal' || props.layoutMode === 'slim';
  }, [props.layoutMode]);

  const isSlim = useCallback(() => {
    return props.layoutMode === 'slim';
  }, [props.layoutMode]);

  const visible = (item: any) => {
    return typeof item.visible === 'function'
      ? item.visible()
      : item.visible !== false;
  };

  const getLink = (item: any, index: any) => {
    const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
    const content = (
      <>
        <i className={menuitemIconClassName}></i>
        <span className="layout-menuitem-text">{t(item.label)}</span>
        {item.items && (
          <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        )}
        {item.badge && <Badge value={item.badge} />}
        <Ripple />
      </>
    );
    const commonLinkProps = {
      style: item.style,
      className: classNames(item.class, 'p-ripple', {
        'p-disabled': item.disabled,
        'p-link': !item.to,
      }),
      target: item.target,
      onClick: (e: any) => onMenuItemClick(e, item, index),
      onMouseEnter: () => onMenuItemMouseEnter(index),
    };

    if (item.url) {
      return (
        <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>
          {content}
        </a>
      );
    } else if (!item.to) {
      return (
        <button type="button" {...commonLinkProps}>
          {content}
        </button>
      );
    }

    return (
      <Link
        href={item.to}
        {...commonLinkProps}
        className="active-menuitem-routelink"
      >
        {content}
      </Link>
    );
  };

  const isMenuActive = (item: any, index: any) => {
    return (
      item.items &&
      (props.root &&
      (!isSlim() ||
        (isSlim() && (props.mobileMenuActive || activeIndex !== null)))
        ? true
        : activeIndex === index)
    );
  };

  const getItems = () => {
    const transitionTimeout = props.mobileMenuActive
      ? 0
      : isSlim() && props.root
      ? { enter: 0, exit: 0 }
      : props.root
      ? 0
      : { enter: 1000, exit: 450 };
    return props.items.map((item: any, i: any) => {
      if (visible(item)) {
        const submenuRef = createRef();
        const menuitemClassName = classNames({
          'layout-root-menuitem': props.root,
          'active-menuitem': activeIndex === i && !item.disabled,
        });
        const rootMenuItem = props.root && (
          <div className="layout-menuitem-root-text">{t(item.label)}</div>
        );
        const link = getLink(item, i);
        const tooltip = (
          <div className="layout-menu-tooltip">
            <div className="layout-menu-tooltip-arrow"></div>
            <div className="layout-menu-tooltip-text">{t(item.label)}</div>
          </div>
        );

        return (
          <li
            key={t(item.label) || i}
            className={menuitemClassName}
            role="menuitem"
          >
            {rootMenuItem}
            {link}
            {tooltip}
            <CSSTransition
              NodeRef={submenuRef}
              classNames="p-toggleable-content"
              timeout={transitionTimeout}
              in={isMenuActive(item, i)}
              unmountOnExit
            >
              <AppSubmenu
                ref={submenuRef}
                items={visible(item) && item.items}
                menuActive={props.menuActive}
                layoutMode={props.layoutMode}
                parentMenuItemActive={activeIndex === i}
                onMenuItemClick={props.onMenuItemClick}
              ></AppSubmenu>
            </CSSTransition>
          </li>
        );
      }

      return null;
    });
  };

  useEffect(() => {
    if (!props.menuActive && isHorizontalOrSlim()) {
      setActiveIndex(null);
    }
  }, [props.menuActive, isHorizontalOrSlim]);

  if (!props.items) {
    return null;
  }

  const items = getItems();

  return (
    <ul ref={ref} className={props.className} role="menu">
      {items}
    </ul>
  );
});
