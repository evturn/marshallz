import React from 'react';
import Post from './Post';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="blog-posts">
        {this.props.posts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </div>
    );
  }
}