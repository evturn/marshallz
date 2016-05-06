import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Header';
import { filterPosts } from 'actions'
import 'less/global/style.less';

class App extends Component {
  componentWillMount() {
    filterPosts({ ...this.props })(this.context.store)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params
      || nextProps.query !== this.props.query) {
      filterPosts({ ...nextProps })(this.context.store)
    }
  }

  render() {
    return (
      <div className="site" style={{ backgroundImage: `url(${require('images/bg.jpg')})` }}>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  authors: PropTypes.array,
  showing: PropTypes.array,
  query: PropTypes.object,
  params: PropTypes.object,
  pathname: PropTypes.string
}

App.contextTypes = {
  store: PropTypes.object
}

export default connect(
  (state, ownProps) => ({
    authors: state.blog.authors,
    showing: state.blog.showing,
    query: ownProps.location.query,
    params: ownProps.params,
    pathname: ownProps.location.pathname
  })
)(App)