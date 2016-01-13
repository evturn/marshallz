import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'containers/SiteHeader';
import classNames from 'classnames/bind';
import 'scss/main';
import bg from 'images/bg.jpg';
import styles from 'scss/layout/_page';

const cx = classNames.bind(styles);

export default class App extends Component {
  render() {
    return (
      <div style={ {backgroundImage: `url(${bg})`} }>
        <div className={cx('site-container')}>
          <SiteHeader />
          <div className={cx('site-content')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  blogPosts: PropTypes.array,
  marshall: PropTypes.object,
  clang: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    blogPosts: state.blogPost.blogPosts,
    marshall: state.bot.marshall,
    clang: state.bot.clang
  };
}

export default connect(mapStateToProps)(App);