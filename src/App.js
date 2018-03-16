import React, { Component } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT, UPDATE_STORE} from "./actions";
import _ from "lodash";

class Container extends Component {

  renderInput(key, value) {
    return (
        <div className="input-group" key={key}>
        <label>{key}</label>
        <input type="text" value={value} onChange={
          (e) => this.props.onChange({ [key]: e.target.value })
        } />
        </div>
    );
  }

  renderInputs() {
    const that = this;
    const keys = _.keys(that.props).sort();
    return _.map(keys, function(k) { return that.renderInput(k, that.props[k]); });
  }

  render() {
    const renderInputs = this.renderInputs.bind(this);
    return (
        <div className={styles.container}>
        <h2>Container</h2>
        <pre><code>{JSON.stringify(this.props)}</code></pre>
        <form>
        { renderInputs() }
        </form>
        <Sub1 {...this.props}/>
        <Sub2 />
        </div>
    );
  }
}

Container.defaultProps = {
  a: "1",
  b: "2"
};

class Sub1 extends Component {
  render() {
    return (
        <div className={styles.sub1}>
        <h3>sub1</h3>
        <pre><code>{JSON.stringify(this.props)}</code></pre>
        </div>
    );
  }
}

class Sub2 extends Component {
  render() {
    return (
        <div className={styles.sub2}>
        <h3>sub2</h3>
        <pre><code>{JSON.stringify(this.props)}</code></pre>
        </div>
    );
  }
}

const ConnectedContainer = connect(
  mapStateToProps,
  (dispatch) => ({
    onChange(data) { return dispatch({ type: UPDATE_STORE, data: data}) }
  })
)(Container);
const ConnectedSub1 = connect(mapStateToProps)(Sub1);
const ConnectedSub2 = connect(mapStateToProps)(Sub2);

class DisconnectedCounter extends Component {
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
        <div className={styles.wrapper}>
        <ConnectedContainer {...this.props} />
        <Counter id="1" increment={this.props.increment} {...this.props.counters["1"]} />
        <Counter id="2" increment={this.props.increment} {...this.props.counters["2"]} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {...state};
}

export default connect(
  mapStateToProps,
  (dispatch) => ({
    increment(id) { return dispatch({ type: INCREMENT, data: id }) },
    decrement(id) { return dispatch({ type: DECREMENT, data: id }) },
  })
)(App);
