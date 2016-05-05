import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import 'less/global/style.less';

class App extends Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${require('images/bg.jpg')})` }}>
        <div className="site-container">
          <Header />
          <div className="site-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);