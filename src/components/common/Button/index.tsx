import styled from 'styled-components';

interface ButtonProps {
  content: ContentType;
}

type ContentType = '저장' | '사이즈 추천 받기';

interface ColorMapType {
  background: string;
  text: string;
}

const contentMap = {
  저장: {
    background: '#1E2025',
    text: '#D9D9D9',
  },
  '사이즈 추천 받기': {
    background: ' #FBF26C',
    text: '#1E2025',
  },
};
const mappingColor = (content: ContentType): ColorMapType => {
  return contentMap[content];
};

function Button(props: ButtonProps) {
  const { content } = props;
  const { background, text } = mappingColor(content);

  return (
    <Root text={text} background={background}>
      {content}
    </Root>
  );
}

export default Button;

const Root = styled.div<{ text: string; background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.6rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 120%;
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
`;
