import React from 'react';
import Button from '../Button';
import SplitedButton from '../SplitedButton';

interface BottomProps {}

function Bottom(props: BottomProps) {
  return (
    <>
      <Button content="저장" />
      {/* <SplitedButton /> */}
    </>
  );
}

export default Bottom;
