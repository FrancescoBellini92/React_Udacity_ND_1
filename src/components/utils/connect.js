import React from "react";
import { StoreConsumer } from "./StoreContext";

export const connect = (mapStateToProps, mapActionsToPRops) => Component => {

  class Receiver extends React.Component {

    state;

    constructor(props) {
      super(props);
      this.state = this.getStateFromMap(props.store.state)
    }

    storeSubscription;

    componentDidMount() {
      const {store} = this.props;
      this.storeSubscription = store.subscribe(store => this.setState(this.getStateFromMap(store)));
    }

    componentWillUnmount() {
      this.storeSubscription.unsubscribe();
    }

    getStateFromMap(store) {
      const state = {};
      Object.entries(mapStateToProps).forEach(([key, val]) => state[key] = store[val]);
      Object.entries(mapActionsToPRops).forEach(([key, val]) => state[key] = val);
      return state;
    }

    render() {
      return <Component {...this.state}></Component>
    }
  }

  const Consumer = () =>
    <StoreConsumer>
      {value => <Receiver store={value} test={'test'}></Receiver>}
    </StoreConsumer>

  return Consumer;
}