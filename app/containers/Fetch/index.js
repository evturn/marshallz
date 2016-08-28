import React, { Component } from 'react'
import request from '../../utils/request'

export default function withFetch(WrappedComponent) {
  return class Fetch extends Component {
    constructor(props) {
      super(props)

      this.state = {
        posts: [],
        authors: [],
      }
    }

    componentDidMount() {
      this.fetch('/api')
    }

    fetch(url) {
      request(url)
        .then(::this.fetchSuccess)
    }

    fetchSuccess(data) {
      this.setState({
        posts: data.posts,
        authors: data.authors,
      })
    }

    render() {
      return <WrappedComponent {...this.state} />
    }

    static displayName = `Fetch(${WrappedComponent.displayName})`
  }
}
