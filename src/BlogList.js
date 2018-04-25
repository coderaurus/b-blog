import React, {Component} from 'react';
import SearchFilter from './SearchFilter';

class BlogList extends Component {
    constructor(props){
        super(props);

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
                list.push( <li className={'col-md-10'} key={blog.id} id={blog.id}>
                    <a id={blog.id} onClick={this.listClicked.bind(this)} name={"blogs " + blog.id} href='./'>{blog.title}</a>
                    <span className='col-md-offset-1 small' name='author'><em>{'by: ' + blog.author}</em></span>
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

    static hasComments(size) {
        if(size > 1) {
            return <li className="comments">{size} comments</li>
        } else if(size === 1) {
            return <li className="comments">{size} comment</li>
        }
    }

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