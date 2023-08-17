import React from "react";
import HomePage from "./components/ShoppingPages/HomePage";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <img
              src="https://www.google.com/imgres?imgurl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2021%2F05%2FOff-White-logo.png&tbnid=K6_7bZLXARBCBM&vet=12ahUKEwi01OyUyuKAAxWhz6ACHR56AZsQMygBegQIARB3..i&imgrefurl=https%3A%2F%2F1000logos.net%2Foff-white-logo%2F&docid=ddBDAE9AcYwJHM&w=3840&h=2160&q=off%20white%20logo&ved=2ahUKEwi01OyUyuKAAxWhz6ACHR56AZsQMygBegQIARB3"
              width="300px"
              className="logo"
            ></img>
          </div>
          <div className="col-md-4"></div>
        </div>
        <HomePage></HomePage>
      </div>
    </>
  );
}

export default App;
