import React from 'react';
import Button from './Button';
import FloatingButton from './FloatingButton';
import SplitedButton from './SplitedButton';

interface BottomProps {}

function Bottom(props: BottomProps) {
  return (
    <>
      {/* <Button content="저장" /> */}
      {/* <SplitedButton /> */}
      <FloatingButton />
    </>
  );
}

export default Bottom;
