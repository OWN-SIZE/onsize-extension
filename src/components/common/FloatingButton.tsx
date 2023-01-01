import styled from 'styled-components';
import arrow_down from '../../assets/icons/arrow_down.svg';

function FloatingButton() {
  return (
    <Root>
      <img src={arrow_down} alt="arrow_down" />
    </Root>
  );
}

export default FloatingButton;

const Root = styled.button`
  position: absolute;
  left: 50%;
  bottom: -2rem;
  transform: translate(-50%, 0);
  width: 8.8rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e2025;
  border-radius: 0.5rem;
`;
