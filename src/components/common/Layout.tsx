import { PropsWithChildren, ReactNode } from 'react';
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
  const currentView = useRecoilValue(currentViewState);
  const history = useRecoilValue(historyState);

  // back 버튼 클릭을 통한 히스토리 존재 시 로컬 스토리지에 저장
  history && localStorage.setItem('history', history);
  localStorage.setItem('currentView', currentView);

  const { children, back, title, close } = props;
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
