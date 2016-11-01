import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from 'containers/Post'
import LoadingIndicator from 'components/LoadingIndicator'
import A from 'components/A'
import * as Actions from 'api/actions'
import css from './styles.css'

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
    return (
      <div className={css.posts}>
        <AuthorPageHeader
          author={this.props.author}
          src={this.props.author.profile_img}
        />

        {this.props.loading
          ? <LoadingIndicator />
          : this.props.posts
            ? this.props.posts.map((x, i) =>
                <Post
                  { ...x }
                  key={i}
                />
              )
            : null
        }
      </div>
    )
  }
}

const AuthorPageHeader = ({ author, src }) => {
  if (!author.profile_img) {
    return null
  }
  return (
    <div className={css.profile}>
      <div className={css.av}>
        <img src={require(`images/${src}`)} />
      </div>
      <div className={css.bio}>
        <div className={css.name}>{author.name}</div>
        {author.twitter
          ? <A
              className={css.social}
              pathname={author.twitter.url}>
              <span className="fa fa-twitter" />
            </A>
          : null
        }
      </div>
    </div>
  )
}

export default connect(
  state => ({
    author: state.global.author,
    posts: state.global.posts,
  }),
  Actions
)(ByAuthor)
