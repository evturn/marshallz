import React from 'react'

export default props => (
  <img
    {...props}
    className={props.className}
    src={props.src}
  />
)
