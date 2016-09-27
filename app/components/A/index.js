import React from 'react'
import Link from 'react-router/Link'

export default ({ pathname, query, ...rest }) => (
  <Link
    {...rest}
    to={{ pathname, query }}>
  </Link>
)

