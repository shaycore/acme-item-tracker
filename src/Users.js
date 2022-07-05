import React from 'react';
import UserForm from './UserForm';
import { connect } from 'react-redux';


const Users = ({ users })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(Users);

// export default connect(
//   (state)=> {
//     return {
//       users: state.users
//     }
//   }
// )(Users);