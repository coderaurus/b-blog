import React, { Component } from 'react';
import BlogList  from './BlogList';
import BlogPost from './BlogPost';
import EditPost from './EditPost';

import './App.css';

/**
 * Main class for the blog application
 */
class App extends Component {

    /**
     * Constructor. Sets the site's state and address for backend in cloud
     */
  constructor(){
    super();
    this.state = {site:'home'};
    this.cloud = 'http://206.189.15.232:8080/blogposts/';
  }

    /**
     * Method handles navigation clicks across the application
     * @param event - the event source where the click is registered from
     */
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

    /**
     * Method renders elements according to the state of application
     * Each element represents a page on a website.
     *
     * @returns JSX elements
     */
  render() {
      console.log('rendering ' + this.state.site);
      if(this.state.site === "home") {
          return (
              <div>
                  <h1 className={'col-md-offset-2'}>B-Blog from Team Bumba</h1>
                  <a role={'button'} className={'btn btn-xs btn-primary col-md-1-8 col-md-offset-7'} name='add' href={'./'} onClick={this.clickHandle.bind(this)}>NEW POST</a>
                  <BlogList amount={this.state.amount} link={this.cloud} listClicked={this.clickHandle.bind(this)}/>
              </div>
          );
      } else if(this.state.site.includes('blog')){
          let idOfBlog = this.state.site.split(' ');
          return (  <div>
                        <BlogPost url={this.cloud + idOfBlog[1]} onClicked={this.clickHandle.bind(this)} />
                    </div>);
      } else if(this.state.site.includes('edit')) {
          let id = this.state.site.split(' ');
          return (  <div>
                        <EditPost mode='edit' id={id[1]} onSubmit={this.clickHandle.bind(this)}/>
                    </div>);
      } else if(this.state.site.includes('add')) {
          return (<div>
                      <EditPost mode='add' id={this.state.amount} onSubmit={this.clickHandle.bind(this)}/>
                  </div>);
      }
  }
}

export default App;
