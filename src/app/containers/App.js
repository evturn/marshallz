import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'components/SiteHeader';
import 'less/global/style.less';

class App extends Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${require('images/bg.jpg')})` }}>
        <div className="site-container">
          <SiteHeader />
          <div className="site-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(App);