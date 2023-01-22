import Lottie from 'lottie-react';
import styled from 'styled-components';

import loading from '../../../assets/lottie/loading.json';
import Layout from '../../../components/common/Layout';

function Loading() {
  return (
    <Layout close>
      <Styled.Root>
        <Lottie animationData={loading} />
      </Styled.Root>
    </Layout>
  );
}

export default Loading;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
