import React, {Component} from 'react';

class BlogPost extends Component {
    constructor(props){
        super(props);
        fetch(props.data).then(response => response.json())
            .then(allData => {
                for(let data of allData){
                    this.state = {data};
                }
            });
    }

    render(){
        return(<div>
            <h2>{this.state.title}</h2>
            <p id="author">{this.state.author}</p>
            <p>{this.state.text}</p>
        </div>);
    }
}

export default BlogPost;