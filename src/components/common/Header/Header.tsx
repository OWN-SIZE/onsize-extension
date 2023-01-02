import styled from 'styled-components';
import icBack from '../../assets/icons/back.svg';
import icClose from '../../assets/icons/close.svg';
interface HeaderProps {
  back?: boolean;
  title?: string;
  close?: boolean;
}

function Header(props: HeaderProps) {
  const { back, title, close } = props;

  return (
    <Styled.Root>
      <Styled.Back>{back && <img src={icBack} alt="back" />}</Styled.Back>
      <Styled.Title>{title || null}</Styled.Title>
      <Styled.Close>{close && <img src={icClose} alt="close" />}</Styled.Close>
    </Styled.Root>
  );
}

export default Header;

const Styled = {
  Root: styled.div`
    width: 100%;
    height: 4.2rem;
    display: flex;
    padding: 1.8rem 1.7rem;
    justify-content: space-between;
    align-items: center;
  `,
  Back: styled.div`
    width: 2.4rem;
    height: 2.4rem;
    & > img {
      width: 2.4rem;
      height: 2.4rem;
    }
  `,
  Title: styled.h1`
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #000000;
  `,
  Close: styled.div`
    width: 2.4rem;
    height: 2.4rem;
    & > img {
      width: 2.4rem;
      height: 2.4rem;
    }
  `,
};
