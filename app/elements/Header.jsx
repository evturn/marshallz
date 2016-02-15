import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import config from '../helmconfig';

class Header extends Component {
  render() {
    return (
      <Helmet
        title="Marshallz Blog"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

renderToString(<Header />);
let header = Helmet.rewind();

export default header;
