import React, {Component} from 'react';

class SearchFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            search:''
        }

        this.changeHandle = this.changeHandle.bind(this);
        this.listUpdate = props.onChange;
    }

    changeHandle(event){
        this.setState({search: event.target.value});
        this.listUpdate(event);
    }

    render(){
        return(<input className={'form-control'} id='search' name='search' placeholder={'Search by author'} value={this.state.search} onChange={this.changeHandle} />);
    }
}

export default SearchFilter;