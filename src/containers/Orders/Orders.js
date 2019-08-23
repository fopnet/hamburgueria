import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";
import { fetchOrders } from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
    this.props.onFecthOrders();
  }

  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : this.props.orders.length ? (
      this.props.orders.map(o => <Order key={o.id} order={o} />)
    ) : (
      <h2>Ops, no order has been found.</h2>
    );

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error : state.order.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFecthOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
