import React, { Fragment } from "react";
import './App.css';


//components

import InputSub from "./components/InputSub";
import ListSubs from "./components/ListSubs";

function App() {
  return (
    <Fragment>
      <div className="container">
         <InputSub />
         <ListSubs />
      </div>
    </Fragment>
  );
}

export default App;
