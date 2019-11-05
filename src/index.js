/**
 * Created by guangqiang on 2017/12/1.
 */
import React from 'react';
import {addNavigationHelpers} from 'react-navigation';
import {Provider, connect} from 'react-redux';
import {store} from './Store';
import AppNavigator from './navigation/AppNavigator';

const App = ({dispatch, nav}) => (
  <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
);

const mapStateToProps = state => ({
  nav: state.navigator,
});

const Navigation = connect(mapStateToProps)(App);

export default InitApp = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
