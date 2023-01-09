import { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

interface PopupProps {
  children: ReactNode;
}

function Popup({ children }: PropsWithChildren<PopupProps>) {
  return <Root>{children}</Root>;
}

export default Popup;

const Root = styled.div`
  width: 38rem;
  height: 37.5rem;
`;
