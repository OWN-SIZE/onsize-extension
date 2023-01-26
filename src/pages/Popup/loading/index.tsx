import Lottie from 'lottie-react';
import styled from 'styled-components';

import loading from '../../../assets/lottie/loading.json';

function Loading() {
  return (
    <Styled.Root>
      <Lottie animationData={loading} />
    </Styled.Root>
  );
}

export default Loading;

const Styled = {
  Root: styled.div`
    width: 38rem;
    height: 38rem;
  `,
};
