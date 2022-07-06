import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things })=> {
  things.sort((a, b) => (a.rank < b.rank) ? 1 : -1)

  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
      </p>
      Our top Three Ranked Items!
      <ul>
        {
          (things.slice(0, 3)).map(thing => {
            return (
              <li key={ thing.id }>
                { thing.name } - RANK: { thing.rank }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapSToP = (s)=> {
  return {
    users: s.users,
    things: s.things
  };
};

export default connect(mapSToP)(Home);
