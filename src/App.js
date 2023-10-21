import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase"; // Import firebase from the correct path
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51O2zDHSDSiNwy514LUrhcBAMqZs4YFFC9wWeZl2ABLACLNALKlDcjrBHws18EmmWmaCph9kBYsNNBl01atPtTG0600TieOHURB"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Use the correct function onAuthStateChanged (not just "auth")
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>>", authUser);

      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch]); // Include "dispatch" as a dependency since it's used inside the effect

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
