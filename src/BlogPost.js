import React, {Component} from 'react';

/**
 * Class handles showing a single blog post. User can also delete the post from here.
 */
class BlogPost extends Component {
    /**
     * Constructor. Initializes states and binds.
     * @param props
     */
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

        this.headers = { "Access-Control-Allow-Origin": "http://localhost:3001/",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-type, Origin"};

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

    /**
     * Method calls for click handler of parent element.
     * @param event
     */
    clickHandle(event){
        this.onClicked(event);
        event.preventDefault();
    }

    /**
     * Method deletes the blog post. A confirmation of deletion is given to the user.
     * @param event
     */
    deletePost(event){
        console.log('delete name ' + event.target.name);

        if(window.confirm('Are you sure you want to delete this post?\n' +
                'If "Yes" you will return to homepage.')) {
            let url = 'http://206.189.15.232:8080/blogposts/' + this.state.id + '/';
            fetch(url, {headers: this.headers,
                        method: 'DELETE'})
                .then(resp => console.log(resp))
                .catch(error => console.log('Error occured: ' + error));
            this.onClicked(event);
        } else { event.preventDefault(); }
    }

    /**
     * Method handles rendering.
     * @returns {*}
     */
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