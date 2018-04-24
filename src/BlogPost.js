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

    render(){
        return(
            <div>
                <a href="./" name="home" onClick={this.clickHandle.bind(this)}>Back to Home</a>

                <h2>{this.state.title}</h2>
                <p id="author">by {this.state.author}</p>
                <p>Content: {this.state.text}</p>
                <form>
                    <button value={this.state.id} name={"edit " + this.state.id} onClick={this.onClicked}>Edit</button>
                </form>
            </div>);
    }
}

export default BlogPost;