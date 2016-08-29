import React from 'react'
import { Link } from 'react-router'

export default props => {
  const { pathname, query, ...rest } = props
  return (
    <Link
      {...rest}
      className={props.className}
      to={{ pathname, query }}>
      {props.children}
    </Link>
  )
}

