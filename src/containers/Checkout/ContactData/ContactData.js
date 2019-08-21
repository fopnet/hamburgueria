import React from "react";
import PropTypes from "prop-types";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {},
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();

    this.setState({ loading: true });

    // console.log(this.props.ingredients);

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: "Felipe",
        email: "fop.net@gmail.com",
        address: {
          street: "rua pendanga",
          zipCode: "59154315",
          city: "parnamirim",
        },
      },
    };
    axios
      .post("/orders.json", order)
      .then(resp => setTimeout(() => this.props.history.push("/"), 100))
      .catch(err => console.error(err))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="zipCode"
          placeholder="ZipCode"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  orderSubmitted: PropTypes.func,
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
};

export default ContactData;
