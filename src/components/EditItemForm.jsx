import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from 'prop-types';

function EditItemForm(props) {
  
  const { item } = props;

  function handleEditItemSubmission(event) {
    event.preventDefault();
    props.onEditingItem({
      name: event.currentTarget.form.name.value,
      origin: event.currentTarget.form.origin.value,
      roast: event.currentTarget.form.roast.value,
      description: event.currentTarget.form.description.value,
      price: parseInt(event.currentTarget.form.price.value),
      quantity: parseInt(event.currentTarget.form.quantity.value),
      notification: item.notification,
      id: item.id
    })
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditItemSubmission}
        onClickingCancel={props.onClickingCancel}
        buttonText="Save Changes" 
        headerText="EDIT BEAN" 
        originImg={props.countryList}
        name={item.name}
        // flag={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].flag}
        plantImg={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImg}
        origin={item.origin}
        roast={item.roast}
        description={item.description}
        price={item.price}
        quantity={item.quantity}
        id={item.id}
        key={item.id}/>
    </React.Fragment>
  );
}

EditItemForm.propTypes = {
  onEditingItem: PropTypes.func,
  onClickingCancel: PropTypes.func,
  item: PropTypes.object,
  countryList: PropTypes.array
};

export default EditItemForm;