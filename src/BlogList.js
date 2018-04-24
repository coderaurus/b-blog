import React, {Component} from 'react';

class BlogList extends Component {
    constructor(props){
        super(props);

        this.site = props.link;
        this.state = {list:[]}

        fetch(props.link).then(response => response.json()).then(blogs => {
            let list = [];
            for(let blog of blogs) {
                list.push( <li key={blog.id}>
                                <a id={blog.id} onClick={props.listClicked} name={"blogs " + blog.id} href='./'>{blog.title} by {blog.author}</a>
                                 | <a id={blog.id} onClick={this.deletePost} name={"delete " + blog.id} href='./'>Delete</a>
                                <ul>
                                    <li>"{blog.text.substr(0,30)}..."</li>
                                    {this.hasComments(blog.comments.length)}
                                </ul>
                            </li>);
            }
            this.setState({list:list});
        });
    }

    deletePost(event){
        console.log('delete id ' + event.target.id);
        console.log('delete name ' + event.target.name);
        let url = 'http://localhost:8080/blogposts/'+event.target.id +'/';
        fetch(url, {method:'DELETE'})
            .then(resp => console.log(resp))
            .catch(error => console.log('Error occured: ' + error));
    }

    hasComments(size) {
        if(size > 1) {
            return <li className="comments">{size} comments</li>
        } else if(size === 1) {
            return <li className="comments">{size} comment</li>
        }
    }

    render(){
        return(<ul>{this.state.list}</ul>);
    }
}

export default BlogList;