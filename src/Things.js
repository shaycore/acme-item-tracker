import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
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
    things: state.things
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteThing: async(thing)=> {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({ type: 'DELETE_THING', thing });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);



// export default connect(
//   (state)=> {
//     return {
//       things: state.things
//     }
//   }
// )(Things);

