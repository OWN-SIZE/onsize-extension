import styled from 'styled-components';

function SplitedButton() {
  return (
    <Styled.Root>
      <Styled.SizeInputButton>사이즈 직접 입력하기</Styled.SizeInputButton>

      <Styled.SaveButton>저장</Styled.SaveButton>
    </Styled.Root>
  );
}

export default SplitedButton;

const Styled = {
  Root: styled.div`
    display: flex;
    height: 6.6rem;
  `,
  SizeInputButton: styled.button`
    width: 26.6rem;
    color: #1e2025;
    background-color: #fbf26c;
    border-radius: 0px 33.5525px 0px 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
  `,
  SaveButton: styled.button`
    width: 11.4rem;
    color: #d9d9d9;
    background-color: #1e2025;
    border-radius: 33.552px 0px 12px 0px;
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
  `,
};
