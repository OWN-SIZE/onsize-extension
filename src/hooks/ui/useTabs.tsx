import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TabName } from '../../components/size-compare';
import { topOrBottomState } from '../../states/atom';

const useTabs = () => {
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [currentTab, setCurrentTab] = useState<TabName>(topOrBottom);

  const handleTab = (tabName: TabName) => {
    setCurrentTab(tabName);
  };

  return { currentTab, handleTab };
};

export default useTabs;
