import React, {Component} from 'react';

class BlogList extends Component {
    constructor(props){
        super(props);


        this.deletePost = this.deletePost.bind(this);

        this.site = props.link;
        this.state = {list:[]};

        fetch(props.link).then(response => response.json()).then(blogs => {
            let list = [];
            for(let blog of blogs) {
                list.push( <li key={blog.id}>
                                <a id={blog.id} onClick={props.listClicked} name={"blogs " + blog.id} href='./'>{blog.title} by {blog.author}</a>
                                  | <a id={blog.id} onClick={this.deletePost} name={"delete " + blog.id} href='./'>Delete</a>
                                <ul>
                                    <li>"{blog.text.substr(0,30)}..."</li>
                                    {BlogList.hasComments(blog.comments.length)}
                                </ul>
                            </li>);
            }
            this.setState({list:list});
        });
    }

    deletePost(event){
        console.log('delete id ' + event.target.id);
        console.log('delete name ' + event.target.name);

        for(let item of this.state.list) {
            if(item === event.target){
                console.log('BINGO! Deleting from state.list');
                let pos = this.state.list.indexOf(item);
                this.state.list.splice(pos, 1);
            }
        }

        if(window.confirm('Are you sure you want to delete this post?')) {
            let url = 'http://localhost:8080/blogposts/' + event.target.id + '/';
            fetch(url, {method: 'DELETE'})
                .then(resp => console.log(resp))
                .catch(error => console.log('Error occured: ' + error));
        } else { event.preventDefault(); }
    }

    static hasComments(size) {
        if(size > 1) {
            return <li className="comments">{size} comments</li>
        } else if(size === 1) {
            return <li className="comments">{size} comment</li>
        }
    }

    render(){
        return(<div><h3>Blogs ({this.state.list.length}):</h3><ul>{this.state.list}</ul></div>);
    }
}

export default BlogList;