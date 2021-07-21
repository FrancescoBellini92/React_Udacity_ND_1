import { reducer } from "./reducers";

export class Store {

  _state = {};

  get state() {
    return this._state;
  }

  _subscriptions = [];

  constructor(reducer, initialState) {
    this.reducer = reducer;
    this._state = initialState;
  }

  subscribe(fn) {
    this._subscriptions.push(fn);
    return {
      unsubscribe: () => this.unsubscribe(fn)
    };
  }

  unsubscribe(sub) {
    this._subscriptions = this._subscriptions.filter(s => s !== sub);
  }

  async dispatch(action) {
    if (typeof action === 'function') {
      action(this.dispatch.bind(this));
      return;
    }
    this._state = this.reducer(action, this._state);
    this._subscriptions.forEach(s => s(this._state));

  }
}

export const store = new Store(reducer, {showSpinner: false, searchedText: '', shelves: [], books: [], searchedBooks: []});
