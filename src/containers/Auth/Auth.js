import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { createInputForm } from "../../shared/utility";
import { auth, setRedirectPath } from "../../store/actions/auth.action";
import classes from "./Auth.css";
import { Redirect } from "react-router-dom";
import * as routesPath from "../../shared/routes";
import { withRouter } from "react-router-dom";

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
    isSignUp: false,
  };

  setStateCallback = (updatedForm, formIsValid) => {
    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  loginHandler = event => {
    event.preventDefault();

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

  // componentDidMount() {
  UNSAFE_componentWillMount() {
    if (
      !this.props.buiding &&
      this.props.authRedirectPath !== routesPath.HOME_ROUTE
    ) {
      console.log("aqui");
      this.props.onSetRedirectPath();
    }
  }

  render() {
    const inputForm = this.props.loading ? (
      <Spinner />
    ) : (
      createInputForm(this.state.loginForm, this.setStateCallback)
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{ color: "red" }}>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? (
          <Redirect to={routesPath.HOME_ROUTE} />
        ) : null}

        <form onSubmit={this.loginHandler}>
          {authRedirect}
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
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buiding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pwd, isSignUp) => {
      dispatch(auth(email, pwd, isSignUp));
    },
    onSetRedirectPath: () => dispatch(setRedirectPath(routesPath.HOME_ROUTE)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth));
