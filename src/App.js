import React, { Component } from 'react';
import PostsList from './PostsList';

import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <h2>B-Blog from Team Bumba</h2>
            <PostsList></PostsList>
        </div>
    );
  }
}

export default App;
