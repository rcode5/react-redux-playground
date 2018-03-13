import React from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT } from './actions';

class DisconnectedCounter extends React.Component {
  render() {
    const {id} = this.props;
    console.log("inner props", this.props);
    return(
        <div className={styles.app} id={ `counter${id}` } >
        <span>ID: {this.props.id} {JSON.stringify(this.props)}</span>
        <p>{ this.props.count }</p>
        <button onClick={() => this.props.increment(id)}>Increment</button>
      </div>
    );
  }
};


const mapCounterStateToProps = state => {
  console.log("counterstate", state);
  return state;
}

const Counter = connect(mapCounterStateToProps)(DisconnectedCounter);

export class App extends React.Component {

  render() {
    console.log('props', this.props);
    return (
        <div className="wrapper">
        <Counter id="1" increment={this.props.increment} {...this.props.counters["1"]} />
        <Counter id="2" increment={this.props.increment} {...this.props.counters["2"]} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {...state}
}
export default connect(
  mapStateToProps,
  (dispatch) => ({
    increment(id) { return dispatch({ type: INCREMENT, data: id }) },
    decrement(id) { return dispatch({ type: DECREMENT, data: id }) },
  })
)(App);
