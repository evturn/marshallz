import React from 'react'
import Link from 'react-router/Link'

export default ({ pathname, query, ...rest }) => (
  <Link
    {...rest}
    to={{ pathname, query }}
    onClick={_ => window.scroll(0, 0)}>
  </Link>
)

