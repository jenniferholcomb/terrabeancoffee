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
            className={`${props.detailPg ? "detailFormImage filledFormImg" : "cardImg"}`}
            style={{
              backgroundImage: `url(${props.newItem === true || props.newOrigin === true ? props.plantImgNo : props.plantImg})`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              boxSizing: "border-box"
            }}
            alt="coffee plantation"
          >
          </div>
        </div>
        <h1 className={props.detailPg ? "detailHeader cardHeader": "listCard cardHeader"} lang="en">{props.name}</h1>
        <div className={props.detailPg ? "detailFlag" : "cardFlag"}>    
          <svg xmlns="http://www.w3.org/2000/svg" width={props.isMobile ? "61" : "71"} height={props.isMobile ? "61" : "71"} viewBox="0 0 71 71" fill="none">
            <clipPath id="circleClip">
              <circle cx="34.5" cy="40.5" r="30.5" />
            </clipPath>
            <defs>
              <filter id="filter0_d_286_3" x="0" y="0" width="71" height="71" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="1" dy="-2"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_286_3"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_286_3" result="shape"/>
              </filter>
            </defs>
            <g filter="url(#filter0_d_286_3)">
              <circle cx="34.5" cy="40.5" r="30.5" fill="#fff" />
              <image href={props.flag} x="6.5" y="12.3" width="56.5" height="56.5" clipPath="url(#circleClip)" />
            </g>
          </svg>   
        </div>

        <h3 className={props.detailPg ? "detailSubHeadOr cardSubHead": "listSubHeadOr cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ORIGIN:&nbsp;&nbsp;<span className="subHeadText">{props.origin}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadRo cardSubHead": "listSubHeadRo cardSubHead"} id={props.detailPg ? '' : "subHeadMarginNrw"}>ROAST:&nbsp;&nbsp;<span className="subHeadTextB">{props.roast}</span></h3>
        <h3 className={props.detailPg ? "detailSubHeadDes cardSubHead": "listSubHeadDes cardSubHead"} id="desSubHead">DESCRIPTION:</h3>
        <div className={props.detailPg ? "detColumn": "desColumn"}> 
          <blockquote className="description" id={props.detailPg ? "detailDescription" : 'listDescription'}>{props.description}</blockquote>
        </div>
        {/* {props.detailPg !== true && (
          <button type="submit" className="cartButtonList buttonNoStroke" onClick={props.handleAddingToCart}><span className="buttonTextList">Add to Cart</span></button>
        )} */}
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