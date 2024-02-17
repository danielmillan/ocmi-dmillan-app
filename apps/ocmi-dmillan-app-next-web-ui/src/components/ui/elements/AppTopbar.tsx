import { useAppSelector } from 'apps/ocmi-dmillan-app-next-web-ui/src/redux/hooks';
import { selectUserInfo } from 'apps/ocmi-dmillan-app-next-web-ui/src/redux/slices/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';

export default function AppTopbar({
  activeTopbarItem,
  onRightMenuButtonClick,
  onMenuButtonClick,
  onTopbarItemClick
}: {
  activeTopbarItem: any;
  onRightMenuButtonClick: any;
  onMenuButtonClick: any;
  onTopbarItemClick: any;
}) {
  const userInfo = useAppSelector(selectUserInfo);
  const router = useRouter();

  const setOnTopbarItemClick = (event: any, item: any) => {
    if (onTopbarItemClick) {
      onTopbarItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const signOut = () => {
    router.push('/logout');
  };

  return (
    <div className="layout-topbar">
      <button
        type="button"
        className="p-link layout-right-panel-button layout-topbar-icon"
        onClick={onRightMenuButtonClick}
      >
        <i className="pi pi-ellipsis-v"></i>
      </button>

      <button
        type="button"
        className="p-link layout-menu-button layout-topbar-icon"
        onClick={onMenuButtonClick}
      >
        <i className="pi pi-bars"></i>
      </button>

      <button
        type="button"
        className="p-link layout-topbar-logo"
        onClick={() => router.push('/')}
      >
        <div className="flex align-items-center topbar-custom">
          <Image
            id="topbar-logo"
            src="/images/Logo-Light.png"
            alt="logo-light"
            width={35}
            height={24}
          />
          <span className="ml-2">Easy Pay - Payrolls</span>
        </div>
      </button>

      <ul className="topbar-menu">
        <li
          className={classNames('user-profile', {
            'active-topmenuitem fadeInDown': activeTopbarItem === 'profile',
          })}
        >
          <button
            type="button"
            className="p-link"
            onClick={(e) => setOnTopbarItemClick(e, 'profile')}
          >
            <img src="/images/avatar.png" alt="roma-layout" />
            <div className="layout-profile-userinfo">
              <span className="layout-profile-name">
                {userInfo ? userInfo.name : '--'}
              </span>
              <span className="layout-profile-role">
                {userInfo ? userInfo.role.name : '--'}
              </span>
            </div>
          </button>
          <ul className="fadeInDown">
            <li role="menuitem">
              <button type="button" className="p-link" onClick={signOut}>
                <i className="pi pi-fw pi-sign-out"></i>
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
