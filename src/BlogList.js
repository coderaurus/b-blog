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
                                <ul>
                                    <li>"{blog.text.substr(0,30)}..."</li>
                                    {this.hasComments(blog.comments.length)}
                                </ul>
                            </li>);
            }
            this.setState({list:list});
        });
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