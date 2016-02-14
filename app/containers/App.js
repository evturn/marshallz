import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'components/SiteHeader';
import classNames from 'classnames/bind';
import 'assets/scss/main';
import bg from 'assets/images/bg.jpg';
import styles from 'assets/scss/layout/_page';

const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
  }
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
  posts: PropTypes.array,
  bots: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    bots: state.bot.bots
  };
}

export default connect(mapStateToProps)(App);