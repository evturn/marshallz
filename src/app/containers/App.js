import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SiteHeader from 'components/SiteHeader';
import 'less/global/style.less';
import createMemoryHistory from 'history/lib/createMemoryHistory';

class App extends Component {
  componentDidMount() {
    createMemoryHistory(this.props.location);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      createMemoryHistory(nextProps.location);
    }
  }
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