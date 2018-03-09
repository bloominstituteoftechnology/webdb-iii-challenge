import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import User from './User';

const ulColor = 'red';

const Div = styled.div`
  border: 1px solid #e7e7e7;
  margin: 1rem;

  ul {
    list-style-type: none;
    color: ${ulColor};
    display: flex;
    flex-direction: column;
  }
`;

class UserList extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <Div>
        <ul>
          <h1>Hello World</h1>
          {this.state.users.map(user => <User key={user.id} user={user} />)}
        </ul>
      </Div>
    );
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default UserList;
