import React, { Component } from 'react'
import request from '../../utils/request'

export default function withFetch(WrappedComponent) {
  return class Fetch extends Component {
    constructor(props) {
      super(props)

      this.state = {
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
      this.fetch(pathname, query)
    }

    fetch(pathname, query) {
      const url = `/api${pathname}${query.page ? `?page=${query.page}` : ''}`
      request(url)
        .then(::this.fetchSuccess)
    }

    fetchSuccess(data) {
      this.setState(data)
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          pathname={this.props.location.pathname}
          query={this.props.location.query}
        />
      )
    }

    static displayName = `Fetch(${WrappedComponent.displayName})`
  }
}
