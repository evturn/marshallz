import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Header';

import { filterPosts } from 'actions'

import Background from './bg.jpg'

import 'sanitize.css/sanitize.css'
import css from './styles.css';

class App extends Component {
  componentDidMount() {
    this.props.filterPosts({ ...this.props })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params
      || nextProps.query !== this.props.query) {
      this.props.filterPosts({ ...nextProps })
    }
  }

  render() {
    return (
      <div className={css.site}>
        <Header />
        <div className={css.content} style={{ backgroundImage: `url(${Background})` }}>
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

const matchStateToProps = (state, ownProps) => ({
  authors: state.blog.authors,
  showing: state.blog.showing,
  query: ownProps.location.query,
  params: ownProps.params,
  pathname: ownProps.location.pathname
})

const matchPropsToDispatch = dispatch => ({
  filterPosts: props => dispatch(filterPosts(props))
})

export default connect(
  matchStateToProps,
  matchPropsToDispatch
)(App)
