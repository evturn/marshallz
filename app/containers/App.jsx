import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import SiteHeader from 'containers/SiteHeader';
import 'scss/main';
import styles from 'scss/layout/_page';
import bg from 'images/bg.jpg';

const cx = classNames.bind(styles);

export default class App extends Component {
  render() {
    const background = {backgroundImage: `url(${bg})`};

    return (
      <div style={background}>
        <div className={cx('site-container')}>
          <SiteHeader />
          <div className={cx('site-content')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
