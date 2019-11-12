/**
 * Created by guangqiang on 2017/12/1.
 */
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import AppNavigator from './navigation/AppNavigator';

// const App = ({dispatch, nav}) => (
//   <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
// );

// const mapStateToProps = state => ({
//   nav: state.navigator,
// });

// const Navigation = connect(mapStateToProps)(App);

export default InitApp = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
