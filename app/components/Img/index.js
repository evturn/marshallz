import React, { Component } from 'react'
import css from './styles.css'

export default class Img extends Component {
  constructor(props) {
    super(props)

    this.image = new Image()
    this.renderImage = ::this.renderImage
    this.state = {
      src: props.url || props.src,
      loaded: props.index === 0 ? true : false
    }
  }

  componentWillMount() {
    this.image.addEventListener('load', this.renderImage)
    this.image.src = this.state.src
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.renderImage)
  }

  renderImage() {
    this.setState({ loaded: true })
  }

  render() {
    const { className } = this.props
    return (
      !this.state.loaded
        ? <div
            className={`${css.waves} ${className ? className : ''}`}
            style={this.props.style}
          />
        : <ImageElement
            url={this.props.url}
            src={this.state.src}
            className={this.props.className}
            style={this.props.style}
          />
    )
  }
}

const ImageElement = props => {

  return (
    props.url
      ? <div
          className={props.className}
          style={{ ...props.style, backgroundImage: `url(${props.src})` }}
        />
    : <img
        className={props.className}
        style={{ ...props.style }}
        src={props.src}
      />
  )
}
