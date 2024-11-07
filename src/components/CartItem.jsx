import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function CartItem(props) {

  const { item, onEditingQuantity, onRemovingItem, } = props;
  const [quantityValue, setQuantityValue] = useState(item.quantityPurchase);

  const handleCartQuantityEditSubmission = () => {
    onEditingQuantity({
      quantityPurchase: parseInt(quantityValue),
      id: item.id
    })
  };

  const handleRemoveClick = () => {
    onRemovingItem(item.id);
  }

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setQuantityValue(value !== "" ? parseInt(value) : '0');
  };

  const handleQDecrement = (event) => {
    const value = (quantityValue > 0 ? parseInt(quantityValue) - 1 : 0);
    setQuantityValue(value.toString());
  };

  const handleQIncrement = () => {
    const value = (quantityValue < 999 ? parseInt(quantityValue) + 1 : 999);
    setQuantityValue(value.toString());
  };

  useEffect(() => {
    handleCartQuantityEditSubmission();
  }, [quantityValue]);

  return (
    <React.Fragment>
      <div className="cartItemContainer">
        <img src={item.plantImg} className="cartImgNrw" alt="coffee plantation from origin country" />

        <div className="cartItemDescription">
          <img src={item.plantImg} className="cartImg" alt="coffee plantation from origin country" />
          <div className="productContainer">
            <h4 className="cartName">{item.name}</h4>
            <h4 className="cartOriginRoast">{item.origin}, {item.roast} roast</h4>
            <h4 className="cartPrice">{`$${item.price}`}</h4>
          </div>
        </div>
        <div className="quantityContainer">
          <form onSubmit={onEditingQuantity}>
            <div className="cartInputRow">
              <button id="cartDecrement" type="button" onClick={handleQDecrement}>-</button>
              <input 
                className='cartQuantityInput'
                name='quantityPurchase'
                value={quantityValue}
                onChange={handleNumberChange}
                maxLength='3'
              />
              <button id="cartIncrement" type="button" onClick={handleQIncrement}>+</button>
            </div>
          </form>
          <h3 className="cartRemove" onClick={handleRemoveClick}>Remove</h3>
        </div>
        <h4 className="cartProductTotal">{`$${item.price * item.quantityPurchase}`}</h4>
      </div>
    </React.Fragment>
  )
}

CartItem.propTypes = {
  item: PropTypes.object,
  onEditingQuantity: PropTypes.func,
  onRemovingItem: PropTypes.func,
  onClickingCheckout: PropTypes.func
};

export default CartItem;

