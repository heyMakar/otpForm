import React from 'react';

const Home = (props) => {
  const { isUserValid } = props;
  if (isUserValid) {
    return ( 
      <h1>Welcome</h1>
    );
  };
  return null;
}

export default Home;