import React, { Component } from 'react';
import BlogList  from './BlogList';

import './App.css';

class App extends Component {

  constructor(){
    super();
  }

  render() {
    return (
        <div>
            <h2>B-Blog from Team Bumba</h2>
            <BlogList link='http://localhost:8080/blogposts/' />
        </div>
    );
  }
}

export default App;
