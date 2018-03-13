import { INCREMENT, DECREMENT } from './actions';

const defaultState = {
  counters: {
    1: { count: 0 },
    2: { count: 0 }
  }
}

export default (state = defaultState, action) => {
  const key = action.data;
  switch(action.type) {
  case INCREMENT:
    return {
      ...state,
      counters: {
        ...state.counters,
        [key]: {
          count: 1 + state.counters[key].count
        }
      }
    };
  case DECREMENT:
    return {
      ...state,
      counters: { [key]: { count: -1 + state.counters[key].count } }
    };

  default:
    return state;
  }
}
