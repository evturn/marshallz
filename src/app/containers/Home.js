import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Posts from 'components/Posts';

class Home extends Component {
  render() {
    const { showing } = this.props;

    return (
      <Posts posts={showing} />
    );
  }
}

Home.propTypes = {
  showing: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    showing: state.blog.showing
  })
)(Home);