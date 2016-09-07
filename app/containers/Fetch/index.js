import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import LoadingIndicator from '../../components/LoadingIndicator'
import * as Actions from '../actions'

export default function withFetch(WrappedComponent) {
  class Fetch extends Component {
    constructor(props) {
      super(props)
      this.fetch = ::this.fetch
    }

    componentDidMount() {
      this.fetch(this.props.pathname, this.props.query)
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.pathname !== nextProps.pathname
        || this.props.query !== nextProps.query) {
        this.fetch(nextProps.pathname, nextProps.query)
      }
    }

    fetch(pathname, query) {
      const url = `/api${pathname}${query.page ? `?page=${query.page}` : ''}`
      this.props.fetchData(url)
    }

    render() {
      return (
        !this.props.loading
          ? <WrappedComponent
              {...this.props}
              pathname={this.props.pathname}
              query={this.props.query}
            />
          : <LoadingIndicator />
      )
    }

    static displayName = `Fetch(${WrappedComponent.displayName})`
  }

  return connect(
    (state, ownProps) => ({
      pathname: ownProps.location.pathname,
      query: ownProps.location.query,
      loading: state.global.loading,
      error: state.global.error,
      posts: state.global.posts,
      authors: state.global.authors,
      author: state.global.author,
      meta: state.global.meta,
    }),
    dispatch => ({
      fetchData: url => dispatch(Actions.fetchData(url))
    }))(Fetch)
}