import React from 'react';
import styled from 'styled-components';

const Li = styled.li`
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;

function User({ user }) {
  return <Li>{user.name}</Li>;
}

export default User;
