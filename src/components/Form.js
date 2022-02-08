import React, { useState } from "react";
import ProteinForm from "./ProteinForm";
import FillingForm from "./FillingForm";
import ToppingForm from "./ToppingForm";
import SideForm from "./SideForm";

function Form(props) {
  const DEFAULT_STATE = {
    protein: [],
    fillings: [],
    toppings: [],
    sides: [],
  };
  const [formState, setFormState] = useState(DEFAULT_STATE);

  console.log(formState);

  function handleSubmit(event) {
    event.preventDefault();

    setFormState({
      ...DEFAULT_STATE,
    });

    props.addOrder(formState);
    event.target.reset();
  }

  function handleChange(event) {
    const itemType = event.target.name;
    const item = event.target.value;
    console.log(item, itemType);

    if (formState[itemType].includes(item)) {
      setFormState({
        ...formState,
        [itemType]: formState[itemType].filter((ingr) => ingr !== item),
      });
    } else {
      setFormState({
        ...formState,
        [itemType]: formState[itemType].concat(item),
      });
    }
  }

  return (
    <div className="ui raised container segment">
      <h1 className="ui block header">Order Form</h1>
      <form className="ui form" id="order-form" onSubmit={handleSubmit}>
        <ProteinForm
          protein={formState.protein}
          handleOnChange={handleChange}
        />

        <FillingForm
          fillings={formState.fillings}
          handleOnChange={handleChange}
        />

        <ToppingForm
          toppings={formState.toppings}
          handleOnChange={handleChange}
        />

        <SideForm sides={formState.sides} handleOnChange={handleChange} />

        <br />

        <button className="ui blue big button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
