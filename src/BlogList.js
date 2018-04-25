import React, {Component} from 'react';
import SearchFilter from './SearchFilter';

class BlogList extends Component {
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.site = props.link;
        this.state = {list:[],
                      filteredList: []};

        fetch(props.link).then(response => response.json()).then(blogs => {
            let list = [];
            for(let blog of blogs) {
                list.push( <li key={blog.id} id={blog.id}>
                                <a id={blog.id} onClick={props.listClicked} name={"blogs " + blog.id} href='./'>{blog.title}</a>
                                <span name='author'>{'by: ' + blog.author + ' | '}</span>
                                <a id={blog.id} onClick={this.deletePost} name={"delete " + blog.id} href='./'>Delete</a>
                                <ul>
                                    <li>"{blog.text.substr(0,30)}..."</li>
                                    {BlogList.hasComments(blog.comments.length)}
                                </ul>
                            </li>);
            }
            this.setState({list:list, filteredList:list});
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

    handleFilterChange(event) {
        let update = this.state.list;
        update = update.filter(function(item){
            console.log(item);
            return item.toString().search('.by .+'+ event.target.value.toLowerCase()+'.+') !== 0;
        });
        this.setState({filteredList: update});
    }

    render(){
        return( <div>
                    <div>
                        <h3>Blogs ({this.state.list.length}):</h3>
                        <SearchFilter onChange={this.handleFilterChange} />
                    </div>
                    <ul>{this.state.filteredList}</ul>
                </div>);
    }
}

export default BlogList;