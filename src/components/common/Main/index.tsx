import { ReactNode } from 'react';
import styled from 'styled-components';

import { CAPTION } from '../../../contants/main';
import theme from '../../../styles/theme';

interface AlertProps {
  src?: string;
  content?: string;
  caption?: boolean;
  link?: ReactNode;
}

function Main(props: AlertProps) {
  const { src, content, caption, link } = props;

  return (
    <Styled.Root>
      <Styled.Image src={src} alt="main icon" />
      <Styled.Content>{content}</Styled.Content>
      {caption && <Styled.Caption>{CAPTION}</Styled.Caption>}
      {link && <Styled.Link>{link}</Styled.Link>}
    </Styled.Root>
  );
}

export default Main;

const Styled = {
  Root: styled.div`
    height: 27.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
  `,
  Image: styled.img`
    width: 7.2rem;
    height: 7.2rem;
    object-fit: contain;
    margin-bottom: 2.6rem;
  `,
  Content: styled.h1`
    ${theme.fonts.title1};
    color: ${theme.colors.black};
  `,
  Caption: styled.div`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 3.2rem;
    color: ${theme.colors.gray300};
    margin-top: 0.815rem;
  `,
  Link: styled.div``,
};
