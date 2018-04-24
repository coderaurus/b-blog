import React, { Component } from 'react';
import BlogList  from './BlogList';
import BlogPost from './BlogPost';
import EditPost from './EditPost';

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {site:"home"};
  }

  clickHandle(event){
      if(event.target.name.includes('home')) {
          this.setState({site:'home'});
      } else if(event.target.name.includes('blog')) {
          let newSite = event.target.name;
          this.setState({site: newSite});
      } else if(event.target.name.includes('edit')) {
          let site = event.target.name;
          this.setState({site:site});
      }
      event.preventDefault();
  }

  onEditSuccess( event ) {
      this.setState({site:event.target.name});
      event.preventDefault();
  }

  onEditCancel(event){
      let blog = 'blog ' + event.target.id;
      console.log('blog: ' + blog);
      this.setState({site: blog});
      event.preventDefault();
  }

  render() {
      console.log('render ' + this.state.site);
      if(this.state.site === "home") {
          return (
              <div>
                  <h2>B-Blog from Team Bumba</h2>
                  <BlogList link='http://localhost:8080/blogposts/' listClicked={this.clickHandle.bind(this)}/>
              </div>
          );
      } else if(this.state.site.includes('blog')){
          let idOfBlog = this.state.site.split(' ');
          return (<BlogPost url={'http://localhost:8080/blogposts/' + idOfBlog[1]} onClicked={this.clickHandle.bind(this)} />);
      } else if(this.state.site.includes('edit')) {
          let id = this.state.site.split(' ');
          return (<EditPost id={id[1]} onSuccess={this.onEditSuccess.bind(this)} onCancel={this.onEditCancel.bind(this)}/>);
      }
  }
}

export default App;
