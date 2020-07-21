import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErroHandler';
import { fetchOrders } from '../../store/actions/index';

class Orders extends Component {
  // componentDidMount() {
  UNSAFE_componentWillMount() {
    this.props.onFecthOrders(this.props.token, this.props.userId);
  }

  render() {
    // eslint-disable-next-line no-nested-ternary
    const orders = this.props.loading ? (
      <Spinner />
    ) : this.props.orders.length ? (
      this.props.orders.map((o) => <Order key={o.id} order={o} />)
    ) : (
      <h2>Ops, no order has been found.</h2>
    );

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  error: state.order.error,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFecthOrders: (token, uid) => dispatch(fetchOrders(token, uid)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios)));
