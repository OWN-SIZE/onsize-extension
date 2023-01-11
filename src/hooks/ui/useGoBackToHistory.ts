import { useRecoilState, useRecoilValue } from 'recoil';

import { currentViewState, historyState } from '../../states/atom';

const useGoBackToHistory = () => {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const history = useRecoilValue(historyState);
  console.log(history);

  const goBacktoHistory = () => {
    document.body.style.width = '38rem';
    document.body.style.height = '37.5rem';
    const container = document.getElementById('app-container') as HTMLElement;
    if (container) {
      container.style.width = '38rem';
      container.style.height = '37.5rem';
    }
    history && setCurrentView(history);
  };
  return goBacktoHistory;
};

export default useGoBackToHistory;
