import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'

import store from '@/redux/store'
import Calendar from '@/components/Calendar'

import "@/style.css";

const App = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  )
}

render(<App />, document.getElementById("root"));
