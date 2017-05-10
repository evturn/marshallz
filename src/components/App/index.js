import React, { Component } from 'react';
import * as API from '../../api.js';
import './styles.css';

class App extends Component {
  static defaultProps = {
    images: {
      marshall: 'http://marshallz.com/d1fdecb21af78615980a7e1763cee94f.png',
      clang: 'http://marshallz.com/9a256811011a5b187a227a61081af257.png',
      b0rf: 'http://marshallz.com/fde5ddffc808c1bf535e8b200d007b44.png',
    }
  }
  state = {
    authors: [],
    posts: [],
  }

  componentWillMount() {
    API.fetchInitialData()
      .then(({authors, posts }) => this.setState({ authors, posts }));
  }

  render() {
    console.log(this.state.authors)
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
                <div className="post">
                  <div className="post-row" key={ii}>
                    <div className="post-header">
                      <div className="image-container">
                        <img className="image" src={this.props.images[x.author.username]} alt=""/>
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
                    <img className="image" src={this.props.images[x.username]} alt=""/>
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
