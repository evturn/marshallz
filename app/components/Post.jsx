import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.post.avatar);
    this.avatar = {backgroundImage: `url(${props.post.avatar})`};
    this.image = {backgroundImage: `url(${props.post.image})`};
  }
  render() {
    return (
      <div className="container post-item">
          <div className="post-item__content">
            <div className="post-item__header">
              <a href="marshallz.com"><div className="post-item__avatar" style={this.avatar}></div></a>
              <div className="post-item__content-meta">
                <div className="post-item__content-author">
                  <a href="marshallz.com">{this.props.post.username} </a><span className="fa fa-circle"></span> <span className="post-item__author-tag">Author</span>
                </div>
                <div className="post-item__content-timestamp" data-livestamp="">{this.props.post.timestamp}</div>
              </div>
            </div>
            <a href="marshallz.com">
              <div className="post-item__content-image" style={this.image}></div>
              <div className="post-item__content-title">{this.props.post.title}</div>
            </a>
            <div className="post-item__content-body">{this.props.post.body}</div>
            <div className="post-item__content-social"><div className="post-item__content-author">
            <a href="marshallz.com" target="_blank">{this.props.post.username} on <span className="fa fa-twitter"></span></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}