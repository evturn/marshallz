import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import LoadingIndicator from '../../components/LoadingIndicator'

export default function withFetch(WrappedComponent) {
  return class Fetch extends Component {
    constructor(props) {
      super(props)

      this.fetch = ::this.fetch
      this.fetchSuccess = ::this.fetchSuccess
      this.fetchError = ::this.fetchError
      this.state = {
        loading: false,
        error: null,
        posts: [],
        authors: [],
        author: {},
        meta: {},
      }
    }

    componentDidMount() {
      const { location: { pathname, query } } = this.props
      this.fetch(pathname, query)
    }

    componentWillReceiveProps(nextProps) {
      const { location: { pathname, query } } = nextProps
      if (this.props.location.pathname !== pathname
        || this.props.location.query !== query) {
        this.fetch(pathname, query)
      }
    }

    fetch(pathname, query) {
      this.setState({ loading: true })
      const url = `/api${pathname}${query.page ? `?page=${query.page}` : ''}`
      return fetch(url)
        .then(x => x.json())
        .then(this.fetchSuccess)
        .catch(this.fetchError)
    }

    fetchSuccess(data) {
      this.setState({ ...data, loading: false })
    }

    fetchError(e) {
      this.setState({ error: e, loading: false })
    }

    render() {
      return (
        !this.state.loading
          ? <WrappedComponent
              {...this.state}
              pathname={this.props.location.pathname}
              query={this.props.location.query}
            />
          : <LoadingIndicator />

      )
    }

    static displayName = `Fetch(${WrappedComponent.displayName})`
  }
}
