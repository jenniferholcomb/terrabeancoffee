import React from "react";
import PropTypes from 'prop-types';

function Item(props) {
  const quantityNotification = 
    props.quantity <= 0 ?
      "OUT OF STOCK"
    :
    props.quantity <= 10 ?
      "ALMOST SOLD OUT!"
    : "";

  return (
    <div onClick = {props.detailPg ? null : () => props.whenItemClicked(props.id)}>
      <div className={props.detailPg ? "details-info" : "itemCard"}>
        <div className="cardImgContainer" id={props.detailPg ? "detailImg" : "listImg"}>
          <img className={props.detailPg ? "" : "cardImg"} src={props.plantImg} alt="coffee plantation in Colombia" />
        </div>
        {/* <div className="content" id={props.detailPg ? "detailContent" : null}> */}
        <div className={props.detailPg ? "headerContainer" : ""}>          
          <h1 className={props.detailPg ? "detailHeader cardHeader": "listCard cardHeader"} lang="en">{props.name}</h1>
        </div>
        <div className={props.detailPg ? "" : "listHeaderContainer"}></div>
        <h3 className={props.detailPg ? "detailSubHeadOr cardSubHead": "listSubHeadOr cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ORIGIN:&nbsp;&nbsp;<span className="subHeadText">{props.origin}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadRo cardSubHead": "listSubHeadRo cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ROAST:&nbsp;&nbsp;<span className="subHeadTextB">{props.roast}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadDes cardSubHead": "listSubHeadDes cardSubHead"} id="desSubHead">DESCRIPTION:</h3>
        <div className={props.detailPg ? "detailFlag" : "cardFlag"}>          
          <img className={props.detailPg ? "flag" : "cardFlagImg"} src={props.flag} alt="Colombia flag" />
        </div>
        <div className={props.detailPg ? "detColumn": "desColumn"}> 
          <blockquote className="description" id={props.detailPg ? "detailDescription" : 'listDescription'}>{props.description}</blockquote>
        </div>
        <h4 className="cardPrice" id={props.detailPg ? "detailPrice" : "listPrice"}>${props.price}<span className="priceUnit">/lb</span></h4>
          {/* <h3 className="cardSubHead">QUANTITY AVAILABLE: {props.quantity} pounds</h3> */}
        {/* </div>  */}

      </div>
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  origin: PropTypes.string,
  roast: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  id: PropTypes.string,
  whenItemClicked: PropTypes.func
}

export default Item;