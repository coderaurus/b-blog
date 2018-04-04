import React, { Component } from 'react';

class Post extends Component {

    constructor(props){
        super(props);

        this.mode = props["mode"];

        this.edit = {
            "title": "",
            "content": ""
        };

        this.state = {
            "user": "monika",
            "time": "12.3.2018",
            "title": "Herro ^_^",
            "content": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices condimentum volutpat. 
                        Suspendisse malesuada nunc non metus blandit, vitae ullamcorper justo vulputate. Suspendisse efficitur
                        vestibulum turpis, a lobortis quam pharetra eu. Duis tincidunt nisl sed quam ultricies lacinia a sed
                        lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        
                        Suspendisse potenti. Pellentesque vel eleifend sem, at pulvinar diam. Proin suscipit purus lorem,
                        ut auctor urna porttitor quis. Aliquam non tristique sem. Etiam vel nulla eu neque tempus efficitur
                        in a lorem. Integer id porta arcu, ut tincidunt eros. Ut laoreet mi sit amet hendrerit maximus. Aliquam
                        lobortis dui eget elementum gravida. Nullam non maximus ipsum.`
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({"mode": this.mode});
        if(this.mode === "edit") {
            this.edit["title"] = this.state.title.toString();
            this.edit["content"] = this.state.content.toString();
            console.log("Title:\n\t" + this.edit.title);
            console.log("Content:\n\t" + this.edit.content);
        }
    }

    handleSubmit(event){
        event.preventDefault();
    }

    handleChange(event){
        console.log("name: " + event.target.name + "\nvalue:" + event.target.value);
        if(event.target.name === "content"){
            this.edit.content = event.target.value;
        } else if (event.target.name === "title") {
            this.edit.title = event.target.value;
        }
    }

    render() {
        return this.state.mode === "edit" ? (
        <td class="post">
            <h1>{this.state.title}</h1>
            <span class="author">{this.state.user}, {this.state.time}</span>
            <p>{this.state.content}</p>
        </td>) :
            (
        <td class="post">
            <form onSubmit={this.handleSubmit}>
                <h3>Title:</h3><br/>
                <input type="text" name="title" value={this.edit.title}/><br/>
                <h3>Content:</h3><br/>
                <textarea  name="content" value={this.edit.content} onChange={this.handleChange}></textarea><br/>
                <input type="submit" value="Save"/><button>Cancel</button>
            </form>
        </td>
            );
    }
}

export default Post;