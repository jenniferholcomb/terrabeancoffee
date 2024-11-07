import React, { useState } from "react";
import PropTypes from 'prop-types';
import Item from "./Item";
import { v4 } from 'uuid';

import narrowIndex from "./../img/indexCardNarrow.webp";

function ItemDetail(props) {
  const { item, onNewCartItem, onClickingDelete, onClickingEdit, onQuantityCreation } = props;
  
  const [quantityValue, setQuantityValue] = useState(1);

  const handleBuyingItem = (event) => {
    event.preventDefault();
    onNewCartItem({
      name: item.name,
      origin: item.origin,
      roast: item.roast,
      price: item.price,
      quantityPurchase: parseInt(quantityValue),
      plantImg: props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImg,
      id: v4()
    })
  }
  
  const handleQuantityForm = (event) => {
    event.preventDefault();
    onQuantityCreation(
      event.target.quantity.value
    );
  };

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
      setQuantityValue(value !== "" ? parseInt(value) : '0');
  };

  const handleQDecrement = () => {
    const value = (quantityValue > 0 ? parseInt(quantityValue) - 1 : 0);
    setQuantityValue(value.toString());
  };

  const handleQIncrement = () => {
    const value = (quantityValue < 999 ? parseInt(quantityValue) + 1 : 999);
    setQuantityValue(value.toString());
  };

  return (
    <React.Fragment>
      <div className="detail-widget">
        <div className="details">
          <h1 className="mobileNameDetail cardHeader" >{item.name}</h1>
          <div className="detailLineContainerA"></div>
          <div className="detailLineContainerB"></div>
          <div className="detailContent">
            <Item 
              name={item.name}
              flag={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].flag}
              plantImg={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImg}
              origin={item.origin}
              roast={item.roast}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
              key={item.id} 
              detailPg={true}
            />
          </div>
          <div className="detailPriceContainer">  
            <h3 className="cardSubHead" id="detailQuantity">available:&nbsp;&nbsp;<span className="subHeadText" id="detailQuantitySpan">{item.quantity} lbs</span></h3>
            <h3 className="cardSubHead" id="detailPriceSubhead">price per pound:&nbsp;&nbsp;<span className="cardPrice" id="detailPriceSpan">${item.price}</span></h3>
          </div>
          <div className="detailFlagContainer" id="detailFlagImg" >
            <img className="flag" src={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].flag} alt="coffee plantation in Colombia" />
          </div>
          <div className="detailImgContainerNrw">
            <img className="detailImgNrw" src={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImg} alt="coffee plantation in Colombia" />
          </div>

          <div className="addCartContainer">

            {/* <button onClick={() => onBuyingItem(1)}>Buy 1 pound</button> */}
            <form onSubmit={ handleQuantityForm }>
              <div className="inputRow">
                <h3 className="cardSubHead" id="inputSubhead">Quantity:</h3>
                <button id="decrement" type="button" onClick={handleQDecrement}>-</button>
                <input 
                  className='priceQuantityInputAddCart'
                  name='quantityPurchase'
                  value={quantityValue}
                  onChange={handleNumberChange}
                  maxLength='3'
                />
                <button id="incrementAddCart" type="button" onClick={handleQIncrement}>+</button>
              </div>
              <button type="submit" className="cartButton" onClick={handleBuyingItem}><span className="buttonTextSolid">Add to Cart</span></button>
            </form>

          </div> 
        </div>
        <div className="indexEditWidget">
          <img src={narrowIndex} className="indexNarrow" alt="index card"/>
        </div>
          <div className="editWidgetContainer">
            <div className="editWidgetActions">
              <h3 className="widgetLinkDetail" id="editLinkA" onClick={onClickingEdit}>+ edit details</h3>
              <h3 className="widgetLinkDetail" id="editLinkB" onClick={onClickingDelete}>- delete bean</h3>
            </div>
          </div>


      </div>
    </React.Fragment>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onQuantityCreation: PropTypes.func
};

export default ItemDetail;

