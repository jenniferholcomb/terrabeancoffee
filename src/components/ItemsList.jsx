import React from "react";
import Item from "./Item";
import PropTypes from 'prop-types';

function ItemsList(props) {

  return (
    <React.Fragment>
      <div id="container-items-list">
        {/* <div className="cardContainer"> */}
          {props.itemsList.map(item => 
            <Item 
              whenItemClicked={props.onItemSelection}
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
            />
          )}
        {/* </div> */}
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