import React from "react";
import PropTypes from 'prop-types';
import CartItem from "./CartItem";

function Cart(props) {

  const { cartList, onEditingCartItem, onRemovingCartItem, cartTotal, onClickingCancel, onClickingCheckout } = props;

  return (
    <>
      <div className="formContainer">
        <div className="formCart">
          <h2  className="cardHeader" id="cartHeader">Cart</h2>
          <div className={`${"breakLine1"} ${"cartLine1"}`}></div>
          <div className="cartContents">
            <div className="contentCategories">
              <h3 className={`${"categoryHeader"} ${"product"}`}>Product</h3>
              <h3 className={`${"categoryHeader"} ${"quantity"}`}>Quantity</h3>
              <h3 className={`${"categoryHeader"} ${"total"}`}>Total</h3>
            </div>
            {
              cartList.length === 0 ?
                <p className="emptyCart">Your cart is currently empty.</p>
              : null
            }
            <div className="cartItemGroup">
              {cartList.map((item, index) => 
                <CartItem item={item} 
                          key={item.id}
                          onEditingQuantity={onEditingCartItem}
                          onRemovingItem={onRemovingCartItem} />
              )}
            </div>
          </div>
          <div className="breakLine3"></div>
          <div className="subtotalRow">
            <div className="empty"></div>
            <h3 className="subtotalHeader">cart subtotal</h3>
            <h4 className="subtotal">${cartTotal}

            </h4>
          </div>
          <div className="cartButtons">
            <div className="updateBtnContainer">
              <button className="cancelFormButton" id="formCancelButton" type="button" onClick={onClickingCancel}><span className="buttonText">return to store</span></button>
            </div>
            <div className="saveBtnContainer">
              <button className={`${cartList.length !== 0 ? "saveFormButton cartSaveButton" : "disabledButton"}`} id="formSaveButton" type="submit" onClick={onClickingCheckout}><span className="buttonTextSolid">Checkout</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  cartList: PropTypes.array,
  cartTotal: PropTypes.number,
  onClickingCancel: PropTypes.func,
  onClickingCheckout: PropTypes.func
};

export default Cart;