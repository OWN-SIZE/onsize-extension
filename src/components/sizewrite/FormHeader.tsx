import styled from 'styled-components';

import theme from '../../styles/theme';

interface FromHeaderProps {
  formHeaderList?: string[];
}

function FormHeader(props: FromHeaderProps) {
  const { formHeaderList } = props;
  return (
    <Styled.Root>
      {formHeaderList?.map((header) => (
        <div key={header}>{header}</div>
      ))}
    </Styled.Root>
  );
}

export default FormHeader;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: space-around;
    width: 55rem;
    border-bottom: 0.1rem solid ${theme.colors.gray200};
    margin-bottom: 1.8rem;
    padding-bottom: 1.5rem;
    color: ${theme.colors.gray350};
    ${theme.fonts.radioText};
    div {
      display: flex;
      justify-content: center;
      width: 6rem;
    }
  `,
};
