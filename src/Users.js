import React from 'react';
import UserForm from './UserForm';
import { connect } from 'react-redux';
import axios from 'axios';


const Users = ({ things, users, deleteUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            const ownedThings = things.filter(_thing => _thing.userId == user.id)
            return (
              <li key={ user.id }>
                <b>{ user.name }</b>
                <br />
                <ol>
                  { ownedThings.map(thing => {
                    return (
                      <li key={ thing.id }>
                        { thing.name }
                      </li>
                    )
                  }) }
                </ol>
                <button onClick={()=> deleteUser(user) }>Delete User</button>
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
    users: state.users,
    things: state.things
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteUser: async(user)=> {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', user });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

// export default connect(
//   (state)=> {
//     return {
//       users: state.users
//     }
//   }
// )(Users);