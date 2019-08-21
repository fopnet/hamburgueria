import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(resp => {
        const orders = [];
        for (let key in resp.data) {
          orders.push({
            ...resp.data[key],
            id: key,
          });
        }
        this.setState({ orders: orders });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const orders = this.state.loading ? (
      <Spinner />
    ) : this.state.orders.length ? (
      this.state.orders.map((o, i) => <Order key={o.id} order={o} />)
    ) : (
      <h2>Ops, no order has been found.</h2>
    );

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
