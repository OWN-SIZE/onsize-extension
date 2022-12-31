import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
  const { children } = props;
  return <Root>{children}</Root>;
}

export default Layout;

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
