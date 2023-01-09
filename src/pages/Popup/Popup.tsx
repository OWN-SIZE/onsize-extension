import { PropsWithChildren, ReactNode } from 'react';

interface PopupProps {
  children: ReactNode;
}

function Popup({ children }: PropsWithChildren<PopupProps>) {
  return <>{children}</>;
}

export default Popup;
