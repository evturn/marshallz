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
      }
    }

    componentDidMount() {
      const { location: { pathname, query } } = this.props
      const url = `/api${pathname}${query.page ? `?page=${query.page}` : ''}`
      this.fetch(url)
    }

    fetch(url) {
      request(url)
        .then(::this.fetchSuccess)
    }

    fetchSuccess(data) {
      this.setState(data)
    }

    render() {
      return <WrappedComponent {...this.state} />
    }

    static displayName = `Fetch(${WrappedComponent.displayName})`
  }
}
