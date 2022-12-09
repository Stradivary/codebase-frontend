import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (!error) {
      return children;
    }

    return (
      <section>
        <h1>Error loading page</h1>
        <button className={styles.button} onClick={() => location.reload()}>Reload</button>
      </section>
    );
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
