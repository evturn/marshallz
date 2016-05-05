import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import 'less/global/style.less';

class App extends Component {
  render() {
    return (
      <div className="site" style={{ backgroundImage: `url(${require('images/bg.jpg')})` }}>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect()(App)