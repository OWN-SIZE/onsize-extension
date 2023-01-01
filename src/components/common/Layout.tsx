import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import Bottom from './Bottom';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children, back, title, close } = props;
  return (
    <Root>
      <Header back={back} title={title} close={close} />
      {children}
      <Bottom />
    </Root>
  );
}

export default Layout;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
