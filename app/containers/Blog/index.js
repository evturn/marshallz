import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


import { filterPosts } from 'actions'

class Blog extends Component {
  componentWillMount() {
    this.props.filterPosts(...this.props)
  }

  render() {

  }
}

const mapPropsToState = (state, { params, location }) => ({
  params: ownProps.params,
  query: ownProps.location.query
})

const mapDispatchToProps = dispatch => ({
  filterPosts: props => dispatch(filterPosts(props))
})

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps)
)(Blog)