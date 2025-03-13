import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CornerSVG from './CornerSVG';

import empty from '/img/emptyImg.webp';

function ReusableForm(props) {
  const [nameText, setNameText] = useState(props.name ? props.name.length : 0);
  const [descText, setDescText] = useState(props.name ? props.description.length : 0);
  const [roastValue, setRoastValue] = useState(props.name ? props.roast : '');
  const [originValue, setOriginValue] = useState(props.name ? props.origin : '');
  const [originImg, setOriginImg] = useState(props.name ? props.newItem || props.newOrigin ? props.plantImgNo : props.plantImg : empty);
  const [priceValue, setPriceValue] = useState(props.name ? props.price : 1);
  const [quanValue, setQuanValue] = useState(props.name ? props.quantity : 1);
  const [saveValue, setSaveValue] = useState(false);
  const nameMaxLength = 40;
  const descMaxLength = 259;

  const checkSaveArray = () => {
    let newSaveArr = 0;
    if (nameText !== 0) { newSaveArr++; }
    if (descText !== 0) { newSaveArr++; }
    if (roastValue !== '') { newSaveArr++; }
    if (originImg !== empty) { newSaveArr++; }
    if (priceValue > 0) { newSaveArr++; }

    if (newSaveArr === 5) {
      setSaveValue(true);
    } else {
      setSaveValue(false);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setNameText(value.length);
    } else if (name === "description") {
      setDescText(value.length);
    } else if (name === "roast") {
      setRoastValue(value);
    } else if (name === "origin") {
      setOriginValue(value);
      setOriginImg(value === '' ? empty : props.originImg[props.originImg.findIndex(country => country.origin === value)].cpImgNo); 
    }
  };

  const handleNumberChange = (event) => {
    const valueNum = event.target.value.replace(/\D/g, "");
    event.target.name === "price" ? 
      setPriceValue(valueNum !== "" ? parseInt(valueNum) : '0')
      : setQuanValue(valueNum !== "" ? parseInt(valueNum) : '0')
  };

  const handleDecrement = () => {
    const value = (priceValue > 0 ? parseInt(priceValue) - 1 : 0);
    setPriceValue(value.toString());
  };

  const handleIncrement = () => {
    const value = (priceValue < 999 ? parseInt(priceValue) + 1 : 999);
    setPriceValue(value.toString());
  };

  const handleQDecrement = () => {
    const value = (quanValue > 0 ? parseInt(quanValue) - 1 : 0);
    setQuanValue(value.toString());
  };

  const handleQIncrement = () => {
    const value = (quanValue < 999 ? parseInt(quanValue) + 1 : 999);
    setQuanValue(value.toString());
  };

  useEffect(() => {
    checkSaveArray();
  }, [nameText, descText, roastValue, originValue, priceValue]);
  
  return (
    <React.Fragment>
      <div className="formContainer">
        <div className="formCard">
          <h2  className="formHeader">{props.headerText}</h2>
          <div className="breakLine1"></div>
          <form onSubmit={props.formSubmissionHandler}>
            <div className="reuseForm">
              <div className="formCol1Content">
                <div className="formLine" id="formTopRow">
                  <label htmlFor="name">NAME: </label>
                  <input 
                    type='text'
                    className='nameInput'
                    name='name'
                    defaultValue={props.name ? props.name : ''}
                    onChange={handleChange}
                    maxLength={nameMaxLength}
                  />
                </div>
                <h5 className="characterCountText">{nameText} / {nameMaxLength} characters</h5>
                <div className="formLine">
                  <label htmlFor="origin">ORIGIN: </label>
                  <select 
                    name='origin' 
                    value={originValue} 
                    onChange={handleChange} 
                    className={`nameInput originInput ${originValue === 'Brazil' ? "nameInputBrazil" : originValue === 'Colombia' ? "nameInputColombia" : originValue === 'India' ? "nameInputIndia" : originValue === 'Phillipines' ? "nameInputPhillipines" : "placeholderOrigin"}`}>
                    { 
                      !props.name ? <option value="">select</option> : null
                    }
                    <option value="Brazil">Brazil</option>
                    <option value="Colombia">Colombia</option>
                    <option value="India">India</option>
                    <option value="Phillipines">Phillipines</option>
                  </select>
                </div>
                <div className="formLine">
                  <label htmlFor="roast">ROAST: </label>
                  <select 
                    name='roast' 
                    value={roastValue} 
                    onChange={handleChange} 
                    className={`nameInput roastInput ${roastValue === '' ? "placeholderOrigin" : null}`}>
                    { 
                      !props.name ? <option value="">select</option> : null
                    }
                    <option value="light">light</option>
                    <option value="medium">medium</option>
                    <option value="dark">dark</option>
                  </select>
                </div>
                <div className="formDescription">
                  <div className="descLab"> 
                    <label htmlFor="description">DESCRIPTION: </label>
                  </div>
                  <textarea 
                    name='description'
                    className='descriptForm'
                    defaultValue={props.name ? props.description : ''}
                    onChange={handleChange}
                    maxLength={descMaxLength}
                  />
                </div>
                <h5 className="characterCountText">{descText} / 259 characters</h5>
              </div>
              <div className="formPrice">
                <div className="formLine">
                  <label htmlFor="price">PRICE PER POUND: </label>
                  <button id="decrement" type="button" onClick={handleDecrement}>-</button>
                  <span className="currencyIcon">
                    <input 
                      className='priceQuantityInput1'
                      name='price'
                      value={priceValue}
                      onChange={handleNumberChange}
                      maxLength='3'
                    />
                  </span>
                  <button id="increment" type="button" onClick={handleIncrement}>+</button>
                </div>
              </div>
              <div className="formCol2Content">
                <div className="formLine">
                  <label htmlFor="available" className="available">POUNDS AVAILABLE: </label>
                  <button id="decrement" type="button" onClick={handleQDecrement}>-</button>
                  <input 
                    className='priceQuantityInput2'
                    name='quantity'
                    value={quanValue}
                    onChange={handleNumberChange}
                    maxLength='3'
                  />
                  <button id="increment" type="button" onClick={handleQIncrement}>+</button>
                </div>
              </div>
              <div
                className={`formImage ${originImg === empty ? "emptyFormImg" : "filledFormImg"}`}
                style={{
                  backgroundImage: `url(${originImg === empty ? "none" : originImg})`,
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
              <div className="breakLine3"></div>
              
              <div className="btn2">
                <button className={`${saveValue ? "cartButtonList cartSaveButton" : "cartButtonListDisabled"}`} id="formButton" type="submit" onClick={props.formSubmissionHandler}><span className={`${saveValue ? "buttonTextSolid" : "buttonTextDisabled"}`}>{props.buttonText}</span></button>
              </div>
              <div className="btn1">
                <button className="cartButtonList" id="formButton" type="button" onClick={props.onClickingCancel}><span className="buttonTextForm">Cancel</span></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  headerText: PropTypes.string,
  onClickingCancel: PropTypes.func
};

export default ReusableForm;
