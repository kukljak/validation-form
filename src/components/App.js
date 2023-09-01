import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import FormComponent from './Form';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <FormComponent />
      </div>
    </Provider>
  );
};

export default App;
