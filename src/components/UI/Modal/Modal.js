import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../BackDrop/BackDrop';

// this reason is do not render OrderSummary unnecessarily
class Modal extends React.Component {
  shouldComponentUpdate(nextProps, _nextState) {
    return (
      nextProps.show !== this.props.show
      || nextProps.children !== this.props.children
    );
  }

  UNSAFE_componentWillUpdate() {
    // console.log("Modal Updated");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};
