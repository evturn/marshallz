import React, {Component} from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.username = 'Clang';
    this.timestamp = 'Right fucking now';
    this.title = 'How to lose a basketball game';
    this.avatar = { backgroundImage: `url('http://marshallz.com/img/clang.png')` };
    this.postImage = { backgroundImage: `url('http://media0.giphy.com/media/UytvN7Dz0DYqs/giphy.gif')` };
    this.body = `DIC display along with the quantization noise lies at a Ventilation Damper is enhanced by twisting diarrhea clockwise or non-metallic shithead copper cable with the site can help you to perform lube the owner manual from the booty more than 0°F everyone dies.`;
  }
  render() {
    return (
      <div className="container post-item">
          <div className="post-item__content">
            <div className="post-item__header">
              <a href="marshallz.com"><div className="post-item__avatar" style={this.avatar}></div></a>
              <div className="post-item__content-meta">
                <div className="post-item__content-author">
                  <a href="marshallz.com">{this.username}</a>
                  <span className="fa fa-circle"></span>
                  <span className="post-item__author-tag">Author</span>
                </div>
                <div className="post-item__content-timestamp" data-livestamp="">{this.timestamp}</div>
              </div>
            </div>
            <a href="marshallz.com">
              <div className="post-item__content-image" style={this.postImage}></div>
              <div className="post-item__content-title">{this.title}</div>
            </a>
            <div className="post-item__content-body">{this.body}</div>
            <div className="post-item__content-social"><div className="post-item__content-author">
            <a href="marshallz.com" target="_blank">{this.username} on <span className="fa fa-twitter"></span></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}