import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => class extends React.Component {
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      axios.defaults.headers.common['Content-Type'] = 'application/json';

      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
          // console.log("interceptor error", err);
          return Promise.reject(err);
        },
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
      const { error } = this.state;
      return (
        <Aux>
          <Modal
            show={error !== null}
            modalClosed={this.errorHandler}
          >
            <div style={{ backgroundColor: 'white' }}>
              {error ? error.message : null}
            </div>
          </Modal>
          <WrappedComponent {...this.props} />
          {' '}
        </Aux>
      );
    }
};

export default withErrorHandler;
