import React, { Component } from 'react';
import Post from './Post.js';

class PostsList extends Component {

    render() {
        return (
        <table id="listOfPosts">
            <tbody>
                <tr>
                    <Post mode="edit"></Post>
                </tr>
                <tr>
                    <Post mode="read"></Post>
                </tr>
            </tbody>
        </table>);
    }
}

export default PostsList;