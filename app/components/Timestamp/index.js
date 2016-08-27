import React from 'react'
import { IntlProvider, FormattedRelative } from 'react-intl'

export default props => {
  return (
    <IntlProvider locale="en">
      <div className={props.className}>
        <FormattedRelative value={props.value} />
      </div>
    </IntlProvider>
  )
}
