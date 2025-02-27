import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ users, things, deleteThing, changeRank, changeOwner })=> {
  things.sort((a, b) => (a.rank < b.rank) ? 1 : -1)

  return (
    <div>
      <h1>Things</h1>
      <ThingForm />
      <ul>
        {
          things.map( thing => {
            const user = users.find( _user => _user.id === thing.userId );
            return (
              <li key={ thing.id }>
                { thing.name }
                <br />
                <br />
                RANK: { thing.rank }   
                <br />
                <button onClick={()=> changeRank(thing,'up') }>+</button>
                <button onClick={()=> changeRank(thing,'down') }>-</button>
                <br />
                <br />
                Owner: 
                <br />
                <select defaultValue={thing.userId ? thing.userId: ''} onChange={(event)=>changeOwner(event.target.value, thing.id)}>
                  <option value=''>--No Owner--</option>
                  {
                    users.map(user => {
                      return (
                        <option value={user.id} key={user.id}>
                          { user.name }
                        </option>
                      )
                    })
                  }
                </select>
                <br />
                <br />
                <button onClick={()=> deleteThing(thing) }>Remove Thing</button>
              </li>
            );
          })
        }
      </ul>
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
    },
    changeOwner: async(owner, thing) => {
      thing = (await axios.put(`/api/things/${thing}`,{ userId: owner })).data;
      dispatch({ type: 'UPDATE_THING', thing });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);