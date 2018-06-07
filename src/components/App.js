import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: "https://practiceapi.devmountain.com/api"
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${this.state.baseUrl}/posts`)
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data });
      })
      .catch(() => console.log("Sorry, you broke it"));
  }

  updatePost(id, text) {
    axios
      .put(`${this.state.baseUrl}/posts?id=${id}`, { text })
      .then(response => {
        // console.log(response.data);
        this.setState({ posts: response.data });
      });
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(response => {
      console.log(response);
      this.setState({ posts: response.data });
    });
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, { text }).then(response => {
      console.log(response);
      this.setState({ posts: response.data });
    });
  }

  render() {
    const { posts } = this.state;
    let myPosts = posts.map(elem => (
      <Post
        key={elem.id}
        text={elem.text}
        date={elem.date}
        updatePostFn={this.updatePost}
        id={elem.id}
        deletePostFn={this.deletePost}
      />
    ));

    return (
      <div className="App__parent">
        <Header />
        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {myPosts}
        </section>
      </div>
    );
  }
}

export default App;
