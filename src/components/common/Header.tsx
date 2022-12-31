import styled from 'styled-components';
import { default as IcBack } from '../../assets/img/back.svg';
import { default as IcClose } from '../../assets/img/close.svg';
interface HeaderProps {
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Header(props: HeaderProps) {
  const { back, title, close } = props;

  return (
    <Root>
      <Back>{back && <img src={IcBack} />}</Back>
      <Title>{title || null}</Title>
      <Close>{close && <img src={IcClose} />}</Close>
    </Root>
  );
}

export default Header;

const Root = styled.div`
  display: flex;
`;

const Back = styled.div``;

const Title = styled.h1``;

const Close = styled.div``;
