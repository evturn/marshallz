import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'assets/scss/components/_spinner.scss';

const cx = classNames.bind(styles);

class Spinner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { image, isFetching, done } = this.props;
    const animation = cx({
      'root': true,
      'fade-out': !isFetching,
      'hidden': done
    });

    return (
      <div className={animation}>
        <div className={cx('animation')}></div>
        <div className={cx('logo')}>
          <img className={cx('image')} src={image} />
        </div>
      </div>
    );
  }
}

Spinner.propTypes = {
  isFetching: PropTypes.bool,
  done: PropTypes.bool,
  image: PropTypes.string
};

function mapStateToProps(state) {
  return {
    isFetching: state.data.isFetching,
    done: state.data.done
  };
}

export default connect(mapStateToProps)(Spinner);