import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TabName } from '../../components/size-compare';
import { topOrBottomState } from '../../states/atom';

const useTabs = () => {
  const storageTabName: TabName = localStorage.getItem('currentTab') as TabName;
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [currentTab, setCurrentTab] = useState<TabName>(
    storageTabName || (topOrBottom === 'null' ? 'top' : topOrBottom),
  );

  const handleTab = (tabName: TabName) => {
    setCurrentTab(tabName);
  };

  return { currentTab, handleTab };
};

export default useTabs;
