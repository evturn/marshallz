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

    console.log(`CURRENT IS_FETCHING ${this.props.isFetching}`);
    console.log(`CURRENT DONE        ${this.props.done}`);
    console.log(`NEXT - IS_FETCHING  ${nextProps.isFetching}`);
    console.log(`NEXT - DONE         ${nextProps.done}`);

    if (nextProps.isFetching === false && this.props.isFetching === true) {
      console.log('FETCHING FALSE');
    }

    if (nextProps.done === true && this.props.done === false) {
      console.log('DONE TRUE');
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
  detail: PropTypes.object,
  author: PropTypes.object,
  isFetching: PropTypes.bool,
  done: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    detail: state.data.detail,
    author: state.data.author,
    posts: state.data.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  };
}

export default connect(mapStateToProps)(App);