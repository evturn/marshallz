import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="site-header">
        <nav className="site-nav">
          <h1 className="site-nav__header"><a href="/">Marshallz Blog</a></h1>
          <h3 className="site-nav__subhead">Welcome! And more importantly, Welcome to Marshallz Blog!</h3>
          <div className="site-nav__mobile">
            <div><span className="fa fa-bars"></span></div>
          </div>
          <div className="site-nav__menu">
            <div className="site-nav__authors">
              <ul className="site-nav__author">
                <li className="site-nav__author-item">Marshall <span className="fa fa-chevron-down"></span></li>
                <li className="site-nav__sublist js-menu">
                  <ul>
                    <li className="site-nav__author-item site-nav__sublist-item"><a href="marshallz.com">Posts</a></li>
                    <li className="site-nav__author-item site-nav__sublist-item"><a href="https://twitter.com/marshallzBlog" target="_blank">Twitter</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}