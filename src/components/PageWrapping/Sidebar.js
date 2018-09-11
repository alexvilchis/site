import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  top: 0;
  right: 0;
  position: absolute;
  width: 350px;
  height: 500px;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 25px;
  border-radius: 6px;
  bottom: auto;
  box-shadow: 3px 3px 15px rgba(0,0,0,.15);
`;

const Sidebar = ({ pageHeight, onPageHeightChange }) => (
  <Wrapper>
    <input
      type="number"
      defaultValue={pageHeight}
      onChange={e => {
        const value = e.target.value;
        if (value) onPageHeightChange(value)
      }}
    />
  </Wrapper>
);

export default Sidebar;
