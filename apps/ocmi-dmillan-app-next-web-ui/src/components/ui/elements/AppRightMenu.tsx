import React from 'react';
import { classNames } from 'primereact/utils';
import { TabView, TabPanel } from 'primereact/tabview';
import LanguagePicker from './LanguagePicker';
import { useTranslation } from 'react-i18next';

export default function AppRightMenu({
  rightPanelMenuActive,
  onRightMenuClick,
}: {
  rightPanelMenuActive: any;
  onRightMenuClick: any;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={classNames('layout-right-panel', {
        'layout-right-panel-active': rightPanelMenuActive,
      })}
      onClick={onRightMenuClick}
    >
      <TabView>
        <TabPanel header={t('labels.parameters')}>
          <div className="flex justify-content-start mt-3">
            <LanguagePicker />
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
}
