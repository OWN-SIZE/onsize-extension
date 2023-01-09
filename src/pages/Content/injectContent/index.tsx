import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import SizeOption from '../../Popup/size-option';

function InjectContent() {
  return <SizeOption />;
}

export default InjectContent;

const view = document.createElement('div');
window.addEventListener('load', () => {
  document.body.prepend(view);
});

document.body.prepend(view);
ReactDOM.createRoot(view as HTMLElement).render(
  <React.StrictMode>
    <InjectContent />
  </React.StrictMode>,
);
