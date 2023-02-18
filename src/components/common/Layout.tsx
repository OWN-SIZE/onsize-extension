import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { currentViewState, historyState } from '../../states/atom';

import Header from './Header/Header';

interface LayoutProps {
  children: ReactNode;
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children, back, title, close } = props;
  const currentView = useRecoilValue(currentViewState);
  const history = useRecoilValue(historyState);

  useEffect(() => {
    if (history) {
      localStorage.setItem('history', history);
    }
    localStorage.setItem('currentView', currentView);

    if (currentView !== 'compare') {
      localStorage.removeItem('currentTab');
    }

    const container = document.getElementById('app-container') as HTMLElement;
    if (!container) return;

    if (currentView === 'size-write') {
      container.style.width = '63.2rem';
      container.style.height = '31.4rem';
    } else {
      container.style.width = '38rem';
      container.style.height = '37.5rem';
    }
  }, []);

  return (
    <Styled.Root>
      <Header back={back} title={title} close={close} />
      {children}
    </Styled.Root>
  );
}

export default Layout;

const Styled = {
  Root: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
  `,
};
