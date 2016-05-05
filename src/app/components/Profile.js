import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/profile.less'

const cx = classNames.bind(css)

class Profile extends Component {
  render() {
    const { name, headshot, share, social } = this.props.author

    return (
      <div className={cx('profile')}>
        <div className={cx('av')}>
          <img src={`/dist/${headshot}`} />
        </div>
        <div className={cx('bio')}>
          <div className={cx('name')}>{name}</div>
          {social ? (
            <Link className={cx('social')} to={{ pathname: share.twitter }} target="_blank">
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