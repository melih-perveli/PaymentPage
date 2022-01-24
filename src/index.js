import React from "react";
import { render } from "react-dom";
import Styles from "./components/Styles";
import { Form, Field } from "react-final-form";
import Card from "./components/CrediCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./components/cardUtils";
import axios from "axios";

toast.configure();

const onSubmit = (values) => {
  axios
    .post(
      "https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf",
      JSON.stringify(values, 0, 2)
    )
    .then((response) => {
      toast("Sent Payment Information");
    })
    .catch((error) => {
      toast("Payment Failed");
    });
};

const App = () => (
  <Styles>
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
      }) => {
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.exp || ""}
                cvc={values.ccv || ""}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="exp"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="ccv"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        );
      }}
    />
  </Styles>
);

render(<App />, document.getElementById("root"));
