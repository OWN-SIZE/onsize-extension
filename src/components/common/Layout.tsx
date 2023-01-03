import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
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
