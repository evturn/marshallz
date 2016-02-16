import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'components/SiteHeader';
import classNames from 'classnames/bind';
import 'assets/scss/main';
import bg from 'assets/images/bg.jpg';
import styles from 'assets/scss/layout/_page';
import createMemoryHistory from 'history/lib/createMemoryHistory';

const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    createMemoryHistory(this.props.location);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      createMemoryHistory(nextProps.location);
    }
  }
  render() {
    return (
      <div style={{ backgroundImage: `url(${bg})` }}>
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
  authors: PropTypes.array,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    authors: state.author.authors,
    isFetching: state.blog.isFetching
  };
}

export default connect(mapStateToProps)(App);