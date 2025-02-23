import React from "react";
import PropTypes from 'prop-types';
import CornerSVG from "./CornerSVG";

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
          <div
            className={`${props.detailPg ? "detailCardImg" : "cardImg"}`}
            style={{
              backgroundImage: `url(${props.newItem === true || props.newOrigin === true ? props.plantImgNo : props.plantImg})`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              boxSizing: "border-box"
            }}
            alt="coffee plantation"
          >
            {[...Array(4)].map((_, index) => (
              <>
                {index < 2 ?                
                  <CornerSVG shadowDx={2} shadowDy={2} blurStdDeviation={2} width={32} height={31} index={index} />
                :
                  <CornerSVG shadowDx={1} shadowDy={1} blurStdDeviation={1.5} width={30} height={29} index={index} />
                }
              </>
            ))}
          </div>
        </div>
        <h1 className={props.detailPg ? "detailHeader cardHeader": "listCard cardHeader"} lang="en">{props.name}</h1>
        <div className={props.detailPg ? "detailFlag" : "cardFlag"}>          
          <img className={props.detailPg ? "flag" : "cardFlagImg"} src={props.flag} alt="Colombia flag" />
        </div>
        <h3 className={props.detailPg ? "detailSubHeadOr cardSubHead": "listSubHeadOr cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ORIGIN:&nbsp;&nbsp;<span className="subHeadText">{props.origin}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadRo cardSubHead": "listSubHeadRo cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ROAST:&nbsp;&nbsp;<span className="subHeadTextB">{props.roast}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadDes cardSubHead": "listSubHeadDes cardSubHead"} id="desSubHead">DESCRIPTION:</h3>
        <div className={props.detailPg ? "detColumn": "desColumn"}> 
          <blockquote className="description" id={props.detailPg ? "detailDescription" : 'listDescription'}>{props.description}</blockquote>
        </div>
        {props.detailPg !== true && (
          <button type="submit" className="cartButtonList" onClick={props.handleAddingToCart}><span className="buttonTextList">Add to Cart</span></button>
        )}
        <h4 className="cardPrice" id={props.detailPg ? "detailPrice" : "listPrice"}>${props.price}<span className="priceUnit"> /lb</span></h4>
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