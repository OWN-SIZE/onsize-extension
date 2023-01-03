import { useState } from 'react';

import { TabName } from '../../components/size-compare';

const useTabs = () => {
  const [currentTab, setCurrentTab] = useState<TabName>('top');

  const handleTab = (tabName: TabName) => {
    setCurrentTab(tabName);
  };

  return { currentTab, handleTab };
};

export default useTabs;
