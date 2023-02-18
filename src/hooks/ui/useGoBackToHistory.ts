import { useRecoilState, useRecoilValue } from 'recoil';

import { currentViewState, historyState } from '../../states/atom';

export const useGoBackToHistory = () => {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const history = useRecoilValue(historyState);

  const goBackToHistory = () => {
    history && setCurrentView(history);
  };
  return { goBackToHistory };
};
