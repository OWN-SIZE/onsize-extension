import Alert from '../../../components/common/Alert';
import { ALERT_LINK, ALERT_MESSAGE } from '../../../contants/alert';
import styled from 'styled-components';

function NoSize() {
  const getLink = <Styled.Link>{ALERT_LINK}</Styled.Link>;

  return <Alert content={ALERT_MESSAGE.NO_PROPER_SIZE} link={getLink} />;
}

export default NoSize;

const Styled = {
  Link: styled.a`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
  `,
};
