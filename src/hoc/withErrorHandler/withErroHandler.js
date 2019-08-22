import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        res => res,
        err => this.setState({ error: err }),
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.respInterceptor);
    }

    errorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error !== null}
            modalClosed={this.errorHandler}
          >
            <div style={{ backgroundColor: "white" }}>
              {this.state.error ? this.state.error.message : null}
            </div>
          </Modal>
          <WrappedComponent {...this.props} />{" "}
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
