import React from "react";
import axios from "axios";
import "./App.css";
const API_URL = "https://609e2b3033eed80017957e97.mockapi.io/blog";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      userId: "",
      title: "",
      body: "",
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  // CREATE
  createPosts = async () => {
    const { userId, title, body } = this.state;
    const { data } = await axios.post(API_URL, {
      userId,
      title,
      body,
    });   

    const posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts, userId: "", title: "", body: "" });
  };

  // READ
  getPosts = async () => {
    const { data } = await axios.get(API_URL);
    this.setState({ posts: data });
    console.log(this.posts);
  };

  // UPDATE
  updatePosts = async () => {
    const { id, userId, title, body } = this.state;
    const { data } = await axios.put(`${API_URL}/${id}`, {
      userId,
      title,
      body,
    });
    // { id: 1, userId: 1, tite, "Test", body: "Test" }

    const posts = [...this.state.posts];
    const postIndex = posts.findIndex((post) => post.id === id);
    posts[postIndex] = data; 
    this.setState({ posts, userId: "", title: "", body: "", id: "" });
  };

  // DELETE
    deletePosts = async (postId) => {
    await axios.delete(`${API_URL}/${postId}`);
    let posts = [...this.state.posts];
    posts = posts.filter(({ id }) => id !== postId);
    this.setState({ posts });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.id) {
      this.updatePosts();
    } else {
      this.createPosts();
    }
  }; 

  render() {
    return (
      <div>
        <h1 >Tech Blogposts</h1>
        <form className="card" onSubmit={this.handleSubmit}>
          <h1  >CREATE/EDIT  Posts</h1>
          <div>
            <label>UserId : </label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label className="space">Title : </label>
            < input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Body : </label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <div>
            <input 
            id="submit"
            className="btn btn-primary"
            type="submit" />
          </div>
          <br />
          <br />
        </form>
        {
          this.state.posts.map((item,index)=>(
            <div key={index} className="card cardDiv">
              <div className="card-title">
                <p>Id: {item.id}</p>
                {item.title}</div>
                <hr/>
                <div className="card-body">
                  {item.body}</div>
                  <div style={{display:"flex"}}>
                  <button className="btn btn-primary "onClick={() => this.updatePosts(item.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => this.deletePosts(item.id)}>
                      Delete
                    </button>
                    </div>
              </div>
          ))
        }
      </div>
    );
  }
}

