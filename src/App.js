import React, { Component } from 'react';
import BlogList  from './BlogList';
import BlogPost from './BlogPost';
import EditPost from './EditPost';

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {site:'home'};
  }

  clickHandle(event){
      event.preventDefault();

      if(event.target.name.includes('home')) {
          this.setState({site:'home'});
      } else if(event.target.name.includes('blog')) {
          let newSite = event.target.name;
          this.setState({site: newSite});
      } else if(event.target.name.includes('edit')) {
          let site = event.target.name;
          this.setState({site:site});
      } else if(event.target.name === 'add'){
          this.setState({site:'add'});
      } else if(event.target.name.includes('delete')) {
          this.setState({site: 'home'});
      }
  }

  onEditSuccess( event ) {
      event.preventDefault();
      this.setState({site:event.target.name});
  }

  onEditCancel(event){
      event.preventDefault();
      if(this.state.site === 'edit'){
          let blog = 'blog ' + event.target.id;
          console.log('blog: ' + blog);
          this.setState({site: blog});
      } else if(this.state.site === 'add') {
          this.setState({site: 'home'});
      }
  }

  render() {
      console.log('rendering ' + this.state.site);
      if(this.state.site === "home") {
          return (
              <div>
                  <h1 className={'col-md-offset-2'}>B-Blog from Team Bumba</h1>
                  <a role={'button'} className={'btn btn-xs btn-primary col-md-1-8 col-md-offset-7'} name='add' href={'./'} onClick={this.clickHandle.bind(this)}>NEW POST</a>
                  <BlogList link='http://localhost:8080/blogposts/' listClicked={this.clickHandle.bind(this)}/>
              </div>
          );
      } else if(this.state.site.includes('blog')){
          let idOfBlog = this.state.site.split(' ');
          return (  <div>
                        <BlogPost url={'http://localhost:8080/blogposts/' + idOfBlog[1]} onClicked={this.clickHandle.bind(this)} />
                    </div>);
      } else if(this.state.site.includes('edit')) {
          let id = this.state.site.split(' ');
          return (  <div>
                        <EditPost mode='edit' id={id[1]} onSuccess={this.onEditSuccess.bind(this)} onCancel={this.onEditCancel.bind(this)}/>
                    </div>);
      } else if(this.state.site.includes('add')) {
          return (<div>
                      <EditPost mode='add' onSuccess={this.onEditSuccess.bind(this)} onCancel={this.onEditCancel.bind(this)}/>
                  </div>);
      }
  }
}

export default App;
