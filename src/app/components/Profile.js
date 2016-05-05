import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/profile.less'

const cx = classNames.bind(css)

class Profile extends Component {
  render() {
    const { authors, username } = this.props
    const [ author ] = authors.filter(x => x.username === username)
    const { name, headshot, share, social } = author
    const img = <img src={`/dist/${headshot}`} />
    return (
      <div className={cx('profile')}>
        <div className={cx('av')}>{img}</div>
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
  username: PropTypes.string,
  authors: PropTypes.array
}

export default connect(
  state => ({
    authors: state.blog.authors,
  })
)(Profile)