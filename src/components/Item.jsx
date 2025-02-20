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
          <div
            className={props.detailPg ? "" : "cardImg"}
            style={{
              backgroundImage: `url(${props.plantImg})`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              boxSizing: "border-box"
            }}
            alt="coffee plantation"
          >
            {[...Array(4)].map((_, index) => (
              <>
                <svg key={index} className={`corner-${index + 1}`}xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                  <g filter="url(#filter0_d_81_314)">
                    <path d="M2 25L2 2L13 2L26 2C26 2 19.5 5.5 12.5 12C5.5 18.5 2 25 2 25Z" fill="#332C2C" fill-opacity="0.7" shape-rendering="crispEdges"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_81_314" x="0" y="0" width="32" height="31" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="2" dy="2"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_81_314"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_81_314" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </>
            ))}
          </div>
        </div>

        <h1 className={props.detailPg ? "detailHeader cardHeader": "listCard cardHeader"} lang="en">{props.name}</h1>
        {/* <div className={props.detailPg ? "headerContainer" : ""}>          
        </div> */}
        <div className={props.detailPg ? "detailFlag" : "cardFlag"}>          
          <img className={props.detailPg ? "flag" : "cardFlagImg"} src={props.flag} alt="Colombia flag" />
        </div>

        <h3 className={props.detailPg ? "detailSubHeadOr cardSubHead": "listSubHeadOr cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ORIGIN:&nbsp;&nbsp;<span className="subHeadText">{props.origin}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadRo cardSubHead": "listSubHeadRo cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ROAST:&nbsp;&nbsp;<span className="subHeadTextB">{props.roast}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadDes cardSubHead": "listSubHeadDes cardSubHead"} id="desSubHead">DESCRIPTION:</h3>

        <div className={props.detailPg ? "detColumn": "desColumn"}> 
          <blockquote className="description" id={props.detailPg ? "detailDescription" : 'listDescription'}>{props.description}</blockquote>
        </div>

        {/* <div className="addCartContainer"> */}

          <button type="submit" className="cartButtonList" onClick={props.handleAddingToCart}><span className="buttonTextList">Add to Cart</span></button>

        {/* </div> */}

        <h4 className="cardPrice" id={props.detailPg ? "detailPrice" : "listPrice"}>${props.price}<span className="priceUnit"> /lb</span></h4>
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