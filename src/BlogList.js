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
        this.listClicked = props.listClicked;
    }

    componentDidMount(){
        fetch(this.site).then(response => response.json()).then(blogs => {
            let list = [];
            for(let blog of blogs) {
                list.push( <li key={blog.id} id={blog.id}>
                    <a id={blog.id} onClick={this.listClicked.bind(this)} name={"blogs " + blog.id} href='./'>{blog.title}</a>
                    <span name='author'>{'by: ' + blog.author + ' | '}</span>
                    <a id={blog.id} onClick={this.deletePost} name={"delete " + blog.id} href='./'>Delete</a>
                    <ul>
                        <li>"{blog.text.substr(0,30)}..."</li>
                        {BlogList.hasComments(blog.comments.length)}
                    </ul>
                </li>);
            }
            this.setState({ list: list,
                            filteredList: list});
        });
    }

    handleFilterChange(event) {
        let update = this.state.list;
        update = update.filter(function(item){
            /* li   . . .   span    . . .   'by: ...'
             * item.props.children[1].props.children.toLowerCase().search(event.target.value.toLowerCase()
             */

            return item.props.children[1].props.children.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({filteredList: update});
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
        let listLen = this.state.filteredList.length;
        return( <div>
                    <div>
                        <h3>Blogs:</h3>
                        <SearchFilter onChange={this.handleFilterChange} /><br />
                        <span id={'searchResult'}>{listLen}{listLen <= 1 ? ' result' : ' results'}</span>
                    </div>
                    {listLen === 0 ? (<p>Loading blogs...</p>):''}
                    <ul>{this.state.filteredList}</ul>
                </div>);
    }
}

export default BlogList;