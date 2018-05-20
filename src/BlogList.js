import React, {Component} from 'react';
import SearchFilter from './SearchFilter';

/**
 * Class for listing all the blogs.
 * Clicking on a blog post opens up the blog.
 */
class BlogList extends Component {
    /**
     * Constructor. Initializes states and binding.
     *
     * @param props - properties given by the main App class
     */
    constructor(props){
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.site = props.link;
        this.state = {list:[],
                      filteredList: []};
        this.listClicked = props.listClicked;
    }

    /**
     * Method retrieves all the blogs from backend once the component has mounted.
     */
    componentDidMount(){
        fetch(this.site).then(response => response.json()).then(blogs => {
            let list = [];
            for(let blog of blogs) {
                list.push( <li className={'col-md-10'} key={blog.id} id={blog.id}>
                    <a id={blog.id} onClick={this.listClicked.bind(this)} name={"blogs " + blog.id} href='./'>{blog.title}</a>
                    <span className='col-md-offset-1 small' name='author'><em>{'by: ' + blog.author}</em></span>
                </li>);
            }
            this.setState({ list: list,
                            filteredList: list});
        });
    }

    /**
     * Method handles search filtering.
     * @param event
     */
    handleFilterChange(event) {
        let update = this.state.list;
        update = update.filter(function(item){
            /* li   . . .   span    . . .           'by: ...'
             * item.props.children[1].props.children.props.children.toLowerCase().search(event.target.value.toLowerCase()
             */
            let filter = item.props.children[1].props.children.props.children;
            return filter.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({filteredList: update});
    }

    /**
     * NO COMMENT HANDLING IMPLEMENTED
     *
     * Method returns a list element of amount of comments according to its noun
     * @param size - how many comments there are
     * @returns JSX list element
     */
    static hasComments(size) {
        if(size > 1) {
            return <li className="comments">{size} comments</li>
        } else if(size === 1) {
            return <li className="comments">{size} comment</li>
        }
    }

    /**
     * Method handles rendering. When application is retrieving data from backend
     * user is informed of it. Also the amount of blogs is given to user.
     * @returns {*}
     */
    render(){
        let listLen = this.state.filteredList.length;
        return( <div className={'text-left'}>
                    <div className={'col-md-5 col-md-offset-4 text-right'}>
                        <SearchFilter onChange={this.handleFilterChange} />
                        <span className={'text-small'} id={'searchResult'}>{listLen}{listLen <= 1 ? ' result' : ' results'}</span>
                    </div>
                    <div className={'col-md-8'}>
                        {listLen === 0 ? (<p className={'col-md-offset-3 text-small'}>Loading blogs...</p>):''}
                        <ul className="list-unstyled col-md-10 col-md-offset-3 text-center">{this.state.filteredList}</ul>
                    </div>
                </div>);
    }
}

export default BlogList;