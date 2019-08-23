import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { generateInputForm } from "../../shared/utility";
import { auth } from "../../store/actions/auth.action";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your e-mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  setStateCallback = (updatedForm, formIsValid) => {
    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  loginHandler = event => {
    event.preventDefault();

    // const formData = generateFormData(this.state.loginForm);
    console.log("isSignUp", this.state.isSignUp);
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSignUp,
    );
  };

  switchSignHandler = event => {
    event.preventDefault();

    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const inputForm = this.props.loading ? (
      <Spinner />
    ) : (
      generateInputForm(this.state.loginForm, this.setStateCallback)
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{ color: "red" }}>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {this.props.token ? <Redirect to="/app" /> : null}
        <form onSubmit={this.loginHandler}>
          {errorMessage}
          {inputForm}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            {this.state.isSignUp ? "SignUp" : "Sign"}
          </Button>
          <Button btnType="Danger" clicked={this.switchSignHandler}>
            Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pwd, isSignUp) => {
      dispatch(auth(email, pwd, isSignUp));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
