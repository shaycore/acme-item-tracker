import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ users, things, deleteThing, changeRank })=> {
  things.sort((a, b) => (a.rank < b.rank) ? 1 : -1)

  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            const user = users.find( _user => _user.id === thing.userId );
            return (
              <li key={ thing.id }>
                { thing.name } - RANK: { thing.rank }
                <button onClick={()=> changeRank(thing,'up') }>+</button>
                <button onClick={()=> changeRank(thing,'down') }>-</button>
                <br />
                Belongs to: { user ? user.name : "Nobody Owns This!!" }
                <br />
                <button onClick={()=> deleteThing(thing) }>Remove</button>
              </li>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};


const mapStateToProps = (state)=> {
  return {
    things: state.things,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteThing: async(thing)=> {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({ type: 'DELETE_THING', thing });
    },
    changeRank: async(thing,direction)=> {
      let value = thing.rank;
      if (direction === 'up') {
        value++
      } else if (direction === 'down') {
        value--
      }
      thing = (await axios.put(`/api/things/${thing.id}`,{ rank: value })).data;
      dispatch({ type: 'UPDATE_THING', thing });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);