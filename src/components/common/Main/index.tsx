import { ReactNode } from 'react';
import styled from 'styled-components';

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
      {caption && <Styled.Caption>{caption}</Styled.Caption>}
      {link && <Styled.Link>{link}</Styled.Link>}
    </Styled.Root>
  );
}

export default Main;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Image: styled.img`
    margin-bottom: 2.6rem;
  `,
  Content: styled.h1`
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #1e2025;
    margin-bottom: 2.6rem;
  `,
  Caption: styled.div`
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 3.2rem;
    color: #a7a7a7;
  `,
  Link: styled.div``,
};
