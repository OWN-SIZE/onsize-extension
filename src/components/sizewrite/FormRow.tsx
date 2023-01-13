import styled from 'styled-components';

import icDelete from '../../assets/icons/delete.svg';
import { IsRowType } from '../../pages/Popup/size-write';
import theme from '../../styles/theme';
import { ValuesType } from '../../types/useForm';

interface RowProps {
  inputList: { inputKey: string; withcm: boolean }[];
  values: ValuesType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isAddRow?: IsRowType;
  onClickDelete?: () => void;
}

function FormRow(props: RowProps) {
  const { inputList, values, handleChange, handleBlur, handleSubmit, isAddRow, onClickDelete } = props;

  return (
    <Styled.RootForm onSubmit={handleSubmit}>
      {isAddRow && (
        <Styled.DeleteButton onClick={onClickDelete} isAddRow={isAddRow}>
          <img src={icDelete} />
        </Styled.DeleteButton>
      )}
      {inputList.map(({ inputKey, withcm }) => (
        <Styled.InputContainer key={inputKey}>
          <Styled.Input
            type={withcm ? 'number' : 'text'}
            name={inputKey}
            value={values[inputKey]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Styled.CmContainer iscm={withcm}>cm</Styled.CmContainer>
        </Styled.InputContainer>
      ))}
    </Styled.RootForm>
  );
}

export default FormRow;

const Styled = {
  RootForm: styled.form`
    display: flex;
    justify-content: space-around;
    width: 55rem;
    height: 3rem;
    margin-bottom: 2.5rem;
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  CmContainer: styled.span<{ iscm: boolean }>`
    position: fixed;
    display: ${({ iscm }) => (iscm ? 'flex' : 'none')};
    margin-left: 6.2rem;
    color: ${theme.colors.gray350};
    ${theme.fonts.radioText};
  `,
  Input: styled.input`
    width: 6rem;
    height: 3rem;
    background: ${theme.colors.gray000};
    border: 0;
    border-radius: 0.5rem;
    text-align: center;
    color: ${theme.colors.gray550};
    ${theme.fonts.bodydsb};
  `,
  DeleteButton: styled.button<{ isAddRow: IsRowType }>`
    position: fixed;
    height: 3rem;
    background: transparent;
    left: 5.9rem;
    left: ${({ isAddRow }) => (isAddRow === 'top' ? '5.9rem' : '2.1rem')};
  `,
};
