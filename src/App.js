import React, { Component } from 'react';
import BlogList  from './BlogList';
import BlogPost from './BlogPost';

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {site:"home"};
  }

  listClickHandle(event){
      event.preventDefault();
      console.log(event.target.href);
      this.setState({site: event.target.href})
  }

  showContent() {
      if(this.state.site === "home") {
          return(<BlogList link='http://localhost:8080/blogposts/' listClicked = {this.listClickHandle.bind(this)}/>);
      }
  }

  render() {
      if(this.state.site === "home") {
          return (
              <div>
                  <h2>B-Blog from Team Bumba</h2>
                  {this.showContent()}
              </div>
          );
      } else if(this.state.site == "/./blog/./"){
          let number = this.state.site.split("/");
          return <BlogPost data={'http://localhost:8080/blogposts/' + number[1]}  />
      }
  }
}

export default App;
