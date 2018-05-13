import React, {Component} from 'react';

class BlogPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: 0,
            comments: '',
            points: 0,
            title: '',
            text: '',
            author: ''
        };

        this.deletePost = this.deletePost.bind(this);
        this.onClicked = props.onClicked;

        fetch(props.url).then(response => response.json()).then(post => {
            this.setState({id: post.id});
            this.setState({title: post.title});
            this.setState({author: post.author});
            this.setState({text: post.text});
            this.setState({comments: post.comments});
            this.setState({points: post.points});
        });
    }

    clickHandle(event){
        this.onClicked(event);
        event.preventDefault();
    }

    deletePost(event){
        console.log('delete name ' + event.target.name);

        if(window.confirm('Are you sure you want to delete this post?\n' +
                'If "Yes" you will return to homepage.')) {
            let url = 'http://localhost:8080/blogposts/' + this.state.id + '/';
            fetch(url, {method: 'DELETE'})
                .then(resp => console.log(resp))
                .catch(error => console.log('Error occured: ' + error));
            this.onClicked(event);
        } else { event.preventDefault(); }
    }

    render(){
        return(
            <div>
                <a href="./" name="home" onClick={this.clickHandle.bind(this)}>Back to Home</a>
                <h2>{this.state.title}</h2>
                <p id="author">by {this.state.author}</p>
                <p>Content: {this.state.text}</p>
                <form>
                    <button className={'col-md-1 btn btn-default btn-sm'} id='edit' value={this.state.id} name={"edit " + this.state.id} onClick={this.onClicked}>Edit</button>
                </form>
                <a className={'col-md-1 btn btn-sm btn-danger'} role={'button'} onClick={this.deletePost} name={"delete " + this.state.id} href='./'>Delete</a>
            </div>);
    }
}

export default BlogPost;