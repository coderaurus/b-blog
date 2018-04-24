import React, {Component} from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: "",
            author: "",
            text: "",
            url : 'http://localhost:8080/blogposts/'+ props.id +'/',
            points: "",
            comments: [],
            onSuccess: props.onEditSuccess
        };

        // this.onSuccess = props.onEditSuccess;
        this.onCancel = props.onEditCancel;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = props.handleClick;

        fetch(this.state.url).then(response => response.json()).then(post => {
            this.setState({title: post.title});
            this.setState({author: post.author});
            this.setState({text: post.text});
            this.setState({points: post.points});
            this.setState({comments: post.comments});
        });
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
        if(event.target.value !== 'cancel') {
            let header = {"Content-type":"application/json"};
            let data = {title: this.state.title,
                        text: this.state.text,
                        author: this.state.author,
                        points: this.state.points,
                        comments: this.state.comments};
            let body = JSON.stringify(data);
            console.log('Body = ' + body);
            fetch(this.state.url, { method: 'PUT',
                                    body: body,
                                    headers: header})
                .then(edited => {
                    console.log('this is ' + this.toString());
                    if(edited.status === 200){
                        console.log('Success:', edited);
                        let site = 'blog ' + this.state.id;
                        console.log('Back to: ' + site);
                        alert("Blog edited successfully.");
                        this.state.onSuccess();
                    }
                }).catch(error => console.error('Error:', error));
        }
    }

    render(){
        return( <div>
                    <a name={'blog ' + this.state.id} href='./' onClick={this.onCancel}>Cancel editing</a>
                    <form onSubmit={this.handleSubmit} name ={'blog ' + this.state.id} >
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
                        <input type="submit" value="Save" />
                    </form>
            </div>);
    }
}

export default EditPost;