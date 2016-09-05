import React from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from './actions';

export class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <p>{ this.props.counter }</p>
        <button onClick={() => this.props.increment()}>Increment</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({ counter: state.counter }),
  (dispatch) => ({
    increment() { return dispatch({ type: INCREMENT }) },
    decrement() { return dispatch({ type: DECREMENT }) },
  })
)(App);
