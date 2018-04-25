import React, {Component} from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.onSuccess = props.onEditSuccess;
        this.onCancel = props.onEditCancel;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = props.handleClick;

        let url;
        if(props.mode === 'edit') {
            url = 'http://localhost:8080/blogposts/'+ props.id +'/';
        } else {
            url = 'http://localhost:8080/blogposts/';
        }

        this.state = {
            mode:           props.mode,
            id:             props.id,
            url:            url,
            title:          "",
            author:         "",
            text:           "",
            points:         "",
            comments:       [],
            editSuccess:    false
        };

        console.log('mode = ' + this.state.mode + '(' + props.mode + ')');
        console.log('url = ' + this.state.url);
    }

    componentDidMount(){
        if(this.state.mode === 'edit'){
            fetch(this.state.url).then(response => response.json()).then(post => {
                this.setState({title: post.title});
                this.setState({author: post.author});
                this.setState({text: post.text});
                this.setState({points: post.points});
                this.setState({comments: post.comments});
            });
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'author':
                this.setState({author: event.target.value});
                break;
            case 'text':
                this.setState({text: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let method = 'PUT';

        if(this.state.mode === 'add') {
            method = 'POST';
        }

        let header = {"Content-type":"application/json"};
        let data = {title: this.state.title,
                    text: this.state.text,
                    author: this.state.author,
                    points: this.state.points,
                    comments: this.state.comments};
        let body = JSON.stringify(data);

        console.log('Url = ' + this.state.url);
        console.log('Method = ' + method);
        console.log('Body = ' + body);
        fetch(this.state.url, { method: method,
                                    body: body,
                                    headers: header})
                .then(edited => {console.log(edited)}).catch(error => console.error('Error:', error));
    }

    render(){
        return( <div>
                    <a name={this.state.mode === 'edit' ? 'blog ' + this.state.id : 'home'} href='./' onClick={this.onCancel}>Cancel editing</a>
                    <form onSubmit={this.handleSubmit} name ={this.state.mode === 'edit' ? 'blog ' + this.state.id : 'add'} >
                        <label>
                            Title:<br/>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </label><br/>
                        <label>
                            Author:<br/>
                            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                        </label><br/>
                        <label>
                            Text:<br/>
                            <textarea name="text" value={this.state.text} onChange={this.handleChange} />
                        </label><br/>
                        <input type="submit" value={this.state.mode === 'edit' ? 'Save' : 'Add'} />
                    </form>
            </div>);
    }
}

export default EditPost;