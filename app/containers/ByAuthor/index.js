import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import Post from 'containers/Post'
import LoadingIndicator from 'components/LoadingIndicator'
import ProfilePic from 'components/ProfilePic'
import * as Actions from 'api/actions'
import css from './styles.css'

@connect(state => ({
  author: state.author,
  loading: state.loading,
  posts: state.posts,
}), Actions)

class ByAuthor extends Component {
  constructor(props) {
    super(props)
    this.fetch = ::this.fetch
  }

  componentDidMount() {
    const { params, location } = this.props
    this.fetch({ params, location })
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, params, location } = nextProps
    if (this.props.pathname !== pathname) {
      this.fetch({ params, location })
    }
  }

  fetch({ params, location }) {
    if (params.slug) {
      this.props.fetchPost({ slug: params.slug })
    } else if (params.author) {
      this.props.fetchByAuthor({ author: params.author, query: location.query })
    }
  }

  render() {
    const { author, loading, posts } = this.props
    return (
      <div className={css.posts}>
        {!author || loading
          ? <LoadingIndicator />
          : <div>
              <div className={css.profile}>
                <div className={css.av}>
                  <ProfilePic src={author.profile_img} />
                </div>
                <div className={css.bio}>
                  <div className={css.name}>{author.name}</div>
                  {author.twitter
                    ? <a className={css.social} href={author.twitter.url}>
                        <span className="fa fa-twitter" />
                      </a>
                    : null
                  }
                </div>
              </div>
              {posts.map((x, i) => <Post {...x} key={i} />)}
            </div>
        }
      </div>
    )
  }
}

export default ByAuthor