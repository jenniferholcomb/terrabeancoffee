import React from "react";
import Item from "./Item";
import PropTypes from 'prop-types';

function ItemsList(props) {
  
  return (
    <React.Fragment>
      <div className={`${!props.isMobile && (props.orientation === "portrait") && (window.innerHeight > 960)  ? "container-items-list-portrait" : "container-items-list"}`}>
        {props.itemsList.map(item => 
          <Item 
            whenItemClicked={props.onItemSelection}
            handleAddingToCart={props.onItemAddedToCart}
            name={item.name}
            flag={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].flag}
            plantImg={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImg}
            plantImgNo={props.countryList[props.countryList.findIndex(country => country.origin === item.origin)].cpImgNo}
            origin={item.origin}
            roast={item.roast}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            id={item.id}
            newItem={item.newItem}
            newOrigin={item.newOrigin}
            isMobile={props.isMobile}
            key={item.id} 
          />
        )}
      </div>
    </React.Fragment>
  );
}

ItemsList.propTypes = {
  itemsList: PropTypes.array,
  onItemSelection: PropTypes.func,
  countryList: PropTypes.array
};

export default ItemsList;