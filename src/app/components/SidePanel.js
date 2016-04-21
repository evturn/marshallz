import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const SidePanel = ({ authors }) => {
  return (
    <ul>{authors.map((x, i) =>
      <li key={i}>{x.name}</li>
    )}</ul>
  )
}

export default SidePanel