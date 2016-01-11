import React, {Component} from 'react';
import Posts from './Posts';
import Header from './Header';
import {default as posts} from '../stores/PostStore';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Posts posts={posts}/>
      </div>
    );
  }
}