import React from 'react';
import moment from 'moment';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

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
                <a href="marshallz.com">{this.props.post.username} </a>
                <span className="post-item__author-tag">Author</span>
              </div>
              {this.renderTimestamp()}
            </div>
          </div>
          <a href="marshallz.com">
            <div className="post-item__content-image" style={this.image}></div>
            <div className="post-item__content-title">{this.props.post.title}</div>
          </a>
          <div className="post-item__content-body">{this.props.post.body}</div>
          <div className="post-item__content-social">
            <div className="post-item__content-author">
              <a href="marshallz.com" target="_blank">{this.props.post.username} on <span className="fa fa-twitter"></span></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderTimestamp() {
    const date = moment(this.props.post.timestamp);

    return <div className="post-item__content-timestamp">{date.format('MM/DD h:mma')}</div>;
  }
}