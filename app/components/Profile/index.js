import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import borf from './hs-borf.png'
import marshall from './hs-marshall.png'
import clang from './hs-clang.png'

import css from './styles.css'

class Profile extends Component {
  render() {
    const { name, headshot, share, social } = this.props.author

    return (
      <div className={css.profile}>
        <div className={css.av}>
          <img src={borf} />
        </div>
        <div className={css.bio}>
          <div className={css.name}>{name}</div>
          {social ? (
            <Link className={css.social} to={{ pathname: share.twitter }} target="_blank">
              <span className="fa fa-twitter" />
            </Link>
          ) : null}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  author: PropTypes.object
}

export default connect(
  state => ({
    author: state.blog.author
  })
)(Profile)
