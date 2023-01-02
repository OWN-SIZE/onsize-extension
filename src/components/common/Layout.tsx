import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import Bottom from './Bottom';
import Header from './Header/Header';

interface LayoutProps {
  children: ReactNode;
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children, back, title, close } = props;
  return (
    <Styled.Root>
      <Header back={back} title={title} close={close} />
      <Styled.Main>{children}</Styled.Main>
      <Bottom />
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
  Main: styled.main`
    height: 27.1rem;
  `,
};
