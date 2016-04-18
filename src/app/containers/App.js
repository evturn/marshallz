import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'components/SiteHeader';
import 'less/global/style.less';
import createMemoryHistory from 'history/lib/createMemoryHistory';

class App extends Component {
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
      <div style={{ backgroundImage: `url(${require('images/bg.jpg')})` }}>
        <div className="site-container">
          <SiteHeader />
          <div className="site-content">
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

export default connect(
  state => ({
    detail: state.data.detail,
    author: state.data.author,
    posts: state.data.posts,
    authors: state.data.authors,
    isFetching: state.data.isFetching,
    done: state.data.done
  })
)(App);