import React, { Component } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import classnames from "classnames";
import { INCREMENT, DECREMENT, UPDATE_STORE} from "./actions";
import _ from "lodash";

function ppJson(obj) { return JSON.stringify(obj, null, 2); }

class Container extends Component {

  renderInput(key, value) {
    return (
        <div className="input-group" key={key}>
        <label>{key}</label>
        <input type="text" />
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
        <div className={styles.flex_row}>
        <div className={ classnames(styles.wrapper, styles.container_wrapper) }>
        <h2>Container</h2>
        <pre><code>{ppJson(this.props)}</code></pre>
        <form>{ renderInputs() }</form>
        </div>
        <ConnectedSub1 />
        <ConnectedSub2  />
        </div>
        </div>
    );
  }
}

Container.defaultProps = {
  a: "1",
  b: "2",
  c: "3",
};

class Sub1 extends Component {
  render() {
    return (
        <div className={styles.sub1}>
        <div className={styles.wrapper}>
        <h3>sub1</h3>
        <pre><code>{ppJson(this.props)}</code></pre>
        <div className="input-group">
        <label>a</label>
        <input type="text" value={this.props.a} onChange={
          (e) => this.props.onChange({ a: e.target.value })
        } />
        </div>
        </div>
        </div>
    );
  }
}

const sub1StateToProps = ({a,b,c}) => {
  return {a, b, c};
};


class Sub2 extends Component {
  render() {
    return (
        <div className={styles.sub2}>
        <div className={styles.wrapper}>
        <h3>sub2</h3>
        <pre><code>{ppJson(this.props)}</code></pre>
        <div className="input-group">
        <label>b</label>
        <input type="text" value={this.props.b} onChange={
          (e) => this.props.onChange({ b: e.target.value })
        } />
        </div>
        </div>
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
const ConnectedSub1 = connect(sub1StateToProps,
  (dispatch) => ({
    onChange(data) { return dispatch({ type: UPDATE_STORE, data: data}) }
  })
)(Sub1);
const ConnectedSub2 = connect(mapStateToProps,
  (dispatch) => ({
    onChange(data) { return dispatch({ type: UPDATE_STORE, data: data}) }
  })
)(Sub2);

class DisconnectedCounter extends Component {
  render() {
    const {id} = this.props;
    console.log("inner props", this.props);
    return(
        <div className={styles.app} id={ `counter${id}` } >
        <pre><code>{ppJson(this.props)}</code></pre>
        <p>
        <button onClick={() => this.props.increment(id)}>Increment</button>
        <span className={styles.counter__count}>{ this.props.count }</span>
        </p>

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
    const clz = styles.wrapper + " " + styles.counters;

    return (
        <div className={styles.all}>
        <ConnectedContainer {...this.props} />
        <div className={clz}>
        <h2>Counters</h2>
        <Counter id="1" increment={this.props.increment} {...this.props.counters["1"]} />
        <Counter id="2" increment={this.props.increment} {...this.props.counters["2"]} />
        </div>
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
