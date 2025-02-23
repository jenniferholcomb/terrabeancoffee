import React from "react";
import PropTypes from 'prop-types';
import ReusableForm from "./ReusableForm";
import { v4 } from 'uuid';

function NewItemForm(props) {
  console.log(props)
  function handleNewItemFormSubmission(event) {

    console.log(event.currentTarget)
    event.preventDefault();
    props.onNewItemCreation({
      name: event.currentTarget.form.name.value,
      origin: event.currentTarget.form.origin.value,
      roast: event.currentTarget.form.roast.value,
      description: event.currentTarget.form.description.value,
      price: event.currentTarget.form.price.value,
      quantity: event.currentTarget.form.quantity.value,
      notification: '',
      newItem: true,
      newOrigin: false,
      id: v4()
    })
  }

  return (
    <React.Fragment>
      <div className="formCard">
      <ReusableForm formSubmissionHandler={ handleNewItemFormSubmission } 
                    onClickingCancel={props.onClickingCancel}
                    originImg={props.countryList}
                    buttonText="Save new Bean" 
                    headerText="Add new bean" />
      </div>
    </React.Fragment>
  );
}

NewItemForm.propTypes ={
  onNewItemCreation: PropTypes.func,
  onClickingCancel: PropTypes.func
};

export default NewItemForm;
