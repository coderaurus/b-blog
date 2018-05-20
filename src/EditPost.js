import React, {Component} from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitted = props.onSubmit;

        // Url used for fetch
        let url;
        if(props.mode === 'edit') {
            url = 'http://206.189.15.232:8080/blogposts/' + props.id +'/';
        } else {
            url = 'http://206.189.15.232:8080/blogposts/';
        }

        this.state = {
            mode:           props.mode,
            id:             props.id,
            url:            url,
            title:          "",
            author:         "",
            text:           "",
            points:         "",
            comments:       []
        };

        console.log('mode = ' + this.state.mode + '(' + props.mode + ')');
        console.log('url = ' + this.state.url);
        console.log('id = ' + this.state.id);
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

        let header = {  "Content-type":"application/json",
                        "Access-Control-Allow-Origin": "*"};
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
                .catch(error => console.error('Error:', error));
        this.submitted(event);
    }

    render(){
        return( <div>
                    <a name={this.state.mode === 'edit' ? 'blog ' + this.state.id : 'home'} href='./' onClick={this.onCancel}>Cancel editing</a>
                    <form onSubmit={this.handleSubmit} name={this.state.mode === 'edit' ? 'blog ' + this.state.id : 'home'} >
                        <label>
                            Title:<br/>
                            <input className={'col-md-6 form-control'} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </label><br/>
                        <label>
                            Author:<br/>
                            <input className={'col-md-6 form-control'} type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                        </label><br/>
                        <label>
                            Text:<br/>
                            <textarea className={'col-md-7 form-control'} rows="4" name="text" value={this.state.text} onChange={this.handleChange} />
                        </label><br/>
                        <input className={'col-md-offset-2 btn btn-default'} type="submit"  name={'blog ' + this.state.id} value={this.state.mode === 'edit' ? 'Save' : 'Add'} />
                    </form>
            </div>);
    }
}

export default EditPost;