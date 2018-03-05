import React, { Component } from 'react';
import * as API from '../../api.js';

class App extends Component {
  state = {
    authors: [],
    posts: [],
  }

  componentWillMount() {
    API.fetchInitialData()
      .then(({authors, posts }) => this.setState({ authors, posts }));
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">Marshallz Blog</h1>
          <p className="caption">
            Welcome! And more importantly, Welcome to Marshallz Blog!
          </p>
        </div>

        <div className="root">
          <div className="content">
            <div className="posts">
              {this.state.posts.map((x, ii) =>
                <div key={ii} className="post">
                  <div className="post-row" key={ii}>
                    <div className="post-header">
                      <div className="image-container">
                        <img
                          className="image"
                          src={require(`../../static/images/${x.author.profile_img}`)}
                          alt={x.author.name} />
                      </div>
                      <div className="name">{x.author.name}</div>
                    </div>
                  </div>
                  <div className="post-row">
                    <div className="post-copy">
                      <div className="post-title">{x.title}</div>
                    </div>
                  </div>
                  <div className="post-row">
                    <div 
                      className="post-media"
                      style={{backgroundImage: `url(${x.image_url})`}}>
                    </div>
                  </div>
                  <div className="post-row">
                    <div className="post-copy">
                      <div className="post-body">{x.body}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="authors">
              {this.state.authors.map((x, ii)=>
                <div className="author" key={ii}>
                  <div className="image-container">
                    <img
                      className="image"
                      src={require(`../../static/images/${x.avatar_img}`)}
                      alt={x.name} />
                  </div>
                  <div className="name">{x.name}</div>
                </div>)}
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-text">© Marshallz Blog</div>
        </div>
      </div>
    );
  }
}

export default App;
