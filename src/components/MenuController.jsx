import React from "react";
import { withHooksHOC } from './withHooksHOC';
import Header from './Header';
import EditItemForm from "./EditItemForm";
import ItemDetail from "./ItemDetail";
import NewItemForm from "./NewItemForm";
import ItemsList from "./ItemsList";
import InventoryWidget from "./InventoryWidget";
import MenuList from "./MenuList";
import Cart from "./Cart";
import { v4 } from 'uuid';

import steward from "/img/stewardAward.webp";
import league from "/img/leagueAward.webp";
import bio from "/img/bioAward.webp";

import roasters from "/img/coffeeRoasters.webp";
import coffeeMugs from "/img/coffee.webp";
import coffeeBean from "/img/terraBeanBean.webp";

import colImg from "/img/colombiaBag.webp";
import colImgNo from "/img/colombiaBag_NoName.webp";
import colFlag from "./../imgold/colombiaFlag.png";
import brazilImg from "/img/brazilBag.webp";
import brazilImgNo from "/img/brazilBag_NoName.webp";
import brazilFlag from "./../imgold/brazilFlag.png";
import indiaImg from "/img/indiaBag.webp";
import indiaImgNo from "/img/indiaBag_NoName.webp";
import indiaFlag from "./../imgold/indiaFlag.png";
import philImg from "/img/phillipinesBag.webp";
import philImgNo from "/img/phillipinesBag_NoName.webp";
import philFlag from "./../imgold/philFlag.png";
import closeIcon from "./../imgold/closeIcon.png";

class MenuController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollingDown: false,
      menuBarVisible: false,
      newItemFormVisible: false,
      editItemFormVisible: false,
      deleteWarningVisible: false,
      newItemAddedSuccessful: false,
      purchaseSuccessful: false,
      cartVisible: false,
      checkoutCompleteVisible: false,
      selectedItem: null,
      cartItems: [],
      cartSubtotal: 0,
      introParagraph: 'Terra Bean Coffee Co. crafts exceptional coffee while protecting the planet. Procuring the finest beans, we delicately roast to highlight unique flavors. Committed to sustainability, we prioritize ethical sourcing, eco-friendly practices, and responsible stewardship of the earth.',
      itemsList: [ { name: 'Arabica', origin: 'Colombia', roast: 'medium', description: 'Our Arabica beans produce the highest-quality coffee, smooth and sweet with complex and intricate flavor undertones that may include fruit, sugar or chocolate. They will usually contain just enough acidity and very little bitterness.', price: 15, quantity: 130, notification: '', newItem: false, newOrigin: false, id: v4() }, { name: 'Robusta', origin: 'Brazil', roast: 'dark', description: 'Robusta coffee is stronger with a heavier body. It has a slight-bitter taste, but still smooth and robust with a fragrant aroma. It\'s deep flavor profile stands up well to creamer, milk, sugar, and other added ingredients.', price: 14, quantity: 130, notification: "", newItem: false, newOrigin: false, id: v4() }, { name: 'Liberica', origin: 'Phillipines', roast: 'light', description: 'A less caffeinated bean, with a nutty bold taste, and a floral aroma. It\'s unique profile is suited to those looking for a lighter cup of coffee, but enjoy the unique flavor notes this been produces. ', price: 17, quantity: 130, notification: "", newItem: false, newOrigin: false, id: v4() }, { name: 'Excelsa', origin: 'India', roast: 'light', description: 'Our excelsa beans have a tart, fruity flavor for a light roast, but with additional notes that are more like those you\'d find in a dark roast. This exceptional bean is a rare treat, many feel it produces the tastiest of cup of coffee.', price: 21, quantity: 130, notification: "", newItem: false, newOrigin: false, id: v4() } ],
      countryList: [ 
                  {origin: 'Colombia', flag: colFlag, cpImg: colImg, cpImgNo: colImgNo}, 
                  {origin: 'Brazil', flag: brazilFlag, cpImg: brazilImg, cpImgNo: brazilImgNo},
                  {origin: 'India', flag: indiaFlag, cpImg: indiaImg, cpImgNo: indiaImgNo},
                  {origin: 'Phillipines', flag: philFlag, cpImg: philImg, cpImgNo: philImgNo} ]
    };
    this.observer = null;
    this.lastScrollY = 0;
  }

  componentDidMount() {
    this.setupObserver();
  }

  setupObserver = () => {
    const { sectionsRef } = this.props;

    if (sectionsRef.current.length > 0) {
      this.observer = new IntersectionObserver(
        
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.2) {
              const index = sectionsRef.current.findIndex((el) => el.current === entry.target);

              if (index !== -1) {

                if (this.state.scrollingDown && sectionsRef.current[index]?.current) {
                  const nextSection = sectionsRef.current[index]?.current;
                  if (nextSection) {
                    const topOffset = nextSection.getBoundingClientRect().top + window.scrollY;
                    
                    window.scrollTo({
                      top: topOffset,
                      behavior: "smooth"
                    });
                  }
                } else if (!this.state.scrollingDown && sectionsRef.current[index - 1]?.current) {
                  sectionsRef.current[index - 1].current.scrollIntoView({ 
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest" 
                  });
                }
              }
            }
          });
        },
        {
          root: null,
          threshold: 0.2
        }
      );
    };

    sectionsRef.current.forEach((section) => {
      if (section.current) {
        this.observer.observe(section.current);
      }
    });
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      const total = this.state.cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantityPurchase * parseInt(item.price);
      }, 0);
      this.setState({
        cartSubtotal: total
      });
    }

    if (prevProps.scrollingDown !== this.props.scrollingDown) {
      this.setState({
        scrollingDown: true
      });
    }
  }

  handleMenuClick = () => {
    this.setState(prevState => ({
      menuBarVisible: !prevState.menuBarVisible,
    }));
  }

  handleShopClick = () => {
    this.handleMenuClick();

    if (typeof document !== "undefined") {
      const shopContainer = document.getElementById("shopContainer");

      if (shopContainer) {
        if (this.observer) {
          this.observer.disconnect();
        }

        shopContainer.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          this.setupObserver();
        }, 1000);
      }
    }
  }

  handleCartClick = () => {
    this.setState(prevState => ({
      cartVisible: !prevState.cartVisible,
      menuBarVisible: false
    }));
  }

  handleClick = () => {

    this.setState(prevState => ({ 
      newItemFormVisible: !prevState.newItemFormVisible
    }));
  }

  handleAddBeanClick = () => {
    this.handleClick();
    this.handleMenuClick();
  }

  handleEditClick = () => {
    this.setState(prevState => ({
      editItemFormVisible: !prevState.editItemFormVisible
    }));
  }

  handleAddingNewItem = (newItem) => {
    console.log(newItem)
    const newItemsList = this.state.itemsList.concat(newItem);
    this.setState({
      itemsList: newItemsList,
      newItemAddedSuccessful: true,
      newItemFormVisible: false
    });
  }

  handleChangingSelectedItem = (itemId) => {
    const newSelectedItem = this.state.itemsList.filter(item => item.id === itemId)[0];
    this.setState({
      selectedItem: newSelectedItem
    });
  }

  handleReturningToList = () => {
    this.setState({
      selectedItem: null,
      editItemFormVisible: false
    });
  }

  handleCancelingEditForm = () => {
    this.setState({
      editItemFormVisible: false
    });
  }

  handleCancelingMessage = () => {
    this.setState({
      deleteWarningVisible: false,
      newItemAddedSuccessful: false,
      checkoutCompleteVisible: false
    })
  }

  handleDeletingWarning = () => {
    this.setState({
      deleteWarningVisible: true
    });
  }

  handleDeletingItem = () => {
    const newItemsList = this.state.itemsList.filter(item => item.id !== this.state.selectedItem.id);
    const newCartList = this.state.cartItems.filter(item => item.name !== this.state.selectedItem.name);
    this.setState({
      itemsList: newItemsList,
      selectedItem: null,
      cartItems: newCartList,
      deleteWarningVisible: false
    });
  }

  handleEditingItem = (editedItem) => {
    const newItemsList = [...this.state.itemsList];
    const index = this.state.itemsList.indexOf(this.state.selectedItem);
    newItemsList.splice(index, 1, editedItem);
    const currentItem = newItemsList[index];

    this.setState({
      itemsList: newItemsList,
      selectedItem: currentItem,
      editItemFormVisible: false
    });
  }

  handleCartQuantityUpdate = (editedCartItem) => {
    const itemIndex = this.state.cartItems.findIndex(obj => obj.id === editedCartItem.id);
    const newCartItem = { ...this.state.cartItems[itemIndex], ...editedCartItem };
    const updatedCartList = [
      ...this.state.cartItems.slice(0, itemIndex), 
      newCartItem,                                
      ...this.state.cartItems.slice(itemIndex + 1) 
    ];

    this.setState({
      cartItems: updatedCartList
    });
  }

  handleCartItemDelete = (deletedId) => {
    const newCartItemList = this.state.cartItems.filter(e => e.id !== deletedId);
    this.setState({
      cartItems: newCartItemList
    });
  }

  handleCheckingOut = () => {
    const updatedList = this.state.itemsList.map(item => {
      const cartItem = this.state.cartItems.find(cartItem => cartItem.name === item.name);
      return cartItem ? { ...item, quantity: item.quantity - cartItem.quantityPurchase} : item;
    })

    this.handleCartClick();
    this.setState({
      // checkoutCompleteVisible: true,
      cartItems: [],
      itemsList: updatedList,
      checkoutCompleteVisible: true
    });

    // purchasedItem.notification = (purchasedItem.quantity === 0) ? "OUT OF STOCK" :
    // (purchasedItem.quantity <= 10) ? "ALMOST SOLD OUT!" : "" ;
  }

  handleAddToCartClick = (newCartItem) => {
    const duplicate = this.state.cartItems.filter(e => e.name === newCartItem.name);
    if (duplicate.length === 0) {
      const newCartItemsList = [...this.state.cartItems, newCartItem];
      this.setState({
        cartItems: newCartItemsList,
        selectedItem: null
      });
    } else {
      const itemIndex = this.state.cartItems.findIndex(obj => obj.name === newCartItem.name);
      const updatedCartItem = { ...this.state.cartItems[itemIndex], ...{ quantityPurchase: (this.state.cartItems[itemIndex].quantityPurchase + newCartItem.quantityPurchase)} };
      const updatedCartItemsList = [
        ...this.state.cartItems.slice(0, itemIndex), 
        updatedCartItem,                            
        ...this.state.cartItems.slice(itemIndex + 1) 
      ];
      this.setState({
        cartItems: updatedCartItemsList,
        selectedItem: null
      });
    }
  }

  render() {
    const { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, translateY, translateYNrw, translateYTablet, translateYTabletPor, translateYMobile, translateYMobileB, isScrolled, isScrolledNrw, isScrolledTablet, isScrolledTabletPor, isScrolledMobile, isScrolledMobileB, isScrolledLogo, logoTranslateY, logoTranslateYNrw, logoTranslateYTablet, logoTranslateYTabletPor, logoTranslateYMobile, orientation, sectionsRef } = this.props;

    return (
      <React.Fragment>
        <div className="appContainer">
          <div className="home">
            <div className="homeLayer" id={"homeSection"} ref={sectionsRef.current[0]}></div>
            <div className="leftPage">
              <MenuList handleShopClick={this.handleShopClick}
                        handleMenuClick={this.handleMenuClick} />
            </div>
            <div className="centerPage"> 
              <div className="centerGradient"></div>
              <div className="menuIconContainer">
              {
                this.state.menuBarVisible ?
                  <React.Fragment>
                    <div className="menuCloseIcon"> 
                      <img src={closeIcon} onClick={ this.handleMenuClick } alt="close icon" />
                    </div>
                    <div className="inventory-widget"> </div>
                    <InventoryWidget itemsList={ this.state.itemsList } 
                                    onAddBeanClick={ this.handleAddBeanClick } />
                  </React.Fragment>
                  
                : 
                  <div 
                    className="menuIcon"
                    onClick={ this.handleMenuClick }
                    style={{
                      transform: isScrolledMobileB
                                 ? `translateY(${translateYMobileB})`
                                 : `translateY(${translateYMobile})`, 
                      background: isScrolledMobile
                                 ? "none"
                                 : `radial-gradient(40.2% 50% at 50% 50%, rgba(0, 0, 0, 0.24) 45.5%, rgba(0, 0, 0, 0.00) 100%)`,
                      transition: "transform 0.5s ease-in-out" 
                    }}
                  >
                    {
                      this.state.newItemFormVisible || this.state.editItemFormVisible || this.state.deleteWarningVisible || this.state.cartVisible || this.state.checkoutCompleteVisible || this.state.selectedItem !== null ?
                        <div className="disabled"></div>
                      :
                        [...Array(3)].map((_) => (
                          <object className={`${isScrolledMobileB ? "menuShop" : ""}`}></object>
                        ))
                    }
                  </div>  
              }
            </div>
              <Header logoTranslateY={logoTranslateY} 
                      logoTranslateYNrw={logoTranslateYNrw} 
                      logoTranslateYTablet={logoTranslateYTablet}
                      logoTranslateYTabletPor={logoTranslateYTabletPor}
                      logoTranslateYMobile={logoTranslateYMobile}
                      isWdDesktop={isWdDesktop} 
                      isTablet={isTablet} 
                      isTabletPor={isTabletPor}
                      isMobile={isMobile} 
                      orientation={orientation} 
                      isScrolledLogo={isScrolledLogo} /> 
            </div>
            <div className="rightPage">
              <div 
                className="cartContainer" 
                style={{
                  transform: !isMobile && (orientation === "portrait") && (window.innerHeight > 960)
                             ? "none"
                             : isWdDesktop 
                             ? `translateY(${translateY})` 
                             : isTablet
                             ? `translateY(${translateYTablet})`
                             : isTabletPor
                             ? `translateY(${translateYTabletPor})`
                             : `translateY(${translateYNrw})`, 
                  transition: "transform 0.5s ease-in-out" 
                }}
              >
                <h3 className={`cart ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) || (isTabletPor && isScrolledTabletPor) ? "cartScrolled" : ""}`} onClick={this.handleCartClick}>cart</h3>
                <div className="cartCountContainer" onClick={this.handleCartClick}>
                  <svg className={`cartCircle ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) ? "circleScrolled" : ""}`} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <circle cx="9.5" cy="9.5" r="9.5" />
                  </svg>
                  <h3 className={`cartCount ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) ? "countScrolled" : ""}`}>{this.state.cartItems.length}</h3>
                </div>
              </div>
          </div>
            <div className="homeContent">
              <div className="homeRow1" id="row1">
                <div className="awardsMobile">
                  <img className="award-1" src={steward} alt="Terra Bean Coffee Co logo" />
                  <img className="award-1" src={league} alt="Terra Bean Coffee Co logo" />
                  <img className="award-2" src={bio} alt="Terra Bean Coffee Co logo" />
                </div>
                <div className="homeImagesDisabled homeImages">
                  <img src={roasters} alt="roasters at work" />
                  <img src={coffeeMugs} alt="steaming cups of coffee" />
                </div>
                <div className="homeCopy">
                  <h5 className="copyDisabled copy">
                    {this.state.introParagraph}
                  </h5>
                  <object className="line"></object>
                  <h3 className="tagHeadRight tagHead1"><span className="boldCopy1">crafted</span> with care,</h3>
                  <div className="textLine2">
                    <h3 className="tagHead2">from <span className="boldCopy">soil</span> to <span className="boldCopy">brew</span></h3>
                    <img className="bean" src={coffeeBean} alt="coffee bean graphic" />
                  </div>
                </div>
              </div>
              <div className="homeRow2" id="row2" ref={sectionsRef.current[1]}>
                <div className="mobileContent">
                  <img src={roasters} alt="roasters roasting coffee" />
                  <div className="copyMobile">
                    <p>{this.state.introParagraph}</p>
                  </div>
                </div>
                <div className="shopLinkMobile" onClick={() => document.getElementById("shop").scrollIntoView({ behavior: "smooth" })}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 87 87" fill="none">
                    <path d="M43.5 56.1875L59.8125 39.875L54.6469 34.8L43.5 45.9469L32.3531 34.8L27.1875 39.875L43.5 56.1875ZM43.5 79.75C38.4854 79.75 33.7729 78.7984 29.3625 76.8953C24.9521 74.9922 21.1156 72.4094 17.8531 69.1469C14.5906 65.8844 12.0078 62.0479 10.1047 57.6375C8.20156 53.2271 7.25 48.5146 7.25 43.5C7.25 38.4854 8.20156 33.7729 10.1047 29.3625C12.0078 24.9521 14.5906 21.1156 17.8531 17.8531C21.1156 14.5906 24.9521 12.0078 29.3625 10.1047C33.7729 8.20156 38.4854 7.25 43.5 7.25C48.5146 7.25 53.2271 8.20156 57.6375 10.1047C62.0479 12.0078 65.8844 14.5906 69.1469 17.8531C72.4094 21.1156 74.9922 24.9521 76.8953 29.3625C78.7984 33.7729 79.75 38.4854 79.75 43.5C79.75 48.5146 78.7984 53.2271 76.8953 57.6375C74.9922 62.0479 72.4094 65.8844 69.1469 69.1469C65.8844 72.4094 62.0479 74.9922 57.6375 76.8953C53.2271 78.7984 48.5146 79.75 43.5 79.75ZM43.5 72.5C51.5958 72.5 58.4531 69.6906 64.0719 64.0719C69.6906 58.4531 72.5 51.5958 72.5 43.5C72.5 35.4042 69.6906 28.5469 64.0719 22.9281C58.4531 17.3094 51.5958 14.5 43.5 14.5C35.4042 14.5 28.5469 17.3094 22.9281 22.9281C17.3094 28.5469 14.5 35.4042 14.5 43.5C14.5 51.5958 17.3094 58.4531 22.9281 64.0719C28.5469 69.6906 35.4042 72.5 43.5 72.5Z" fill="#E4E4E4"/>
                  </svg>
                  <h5 className="boldCopy mobileBoldText">shop</h5>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isWdDesktop ? "shop-container" : "shop-containerNrw"}`} id="shop">
            <div className="shopContainerLayer" id="shopContainer" ref={sectionsRef.current[2]}></div>
            {
              isTablet && this.state.selectedItem !== null ? 
                null
              : 
                <React.Fragment>
                  <ItemsList itemsList={ this.state.itemsList } 
                              onItemSelection={ this.handleChangingSelectedItem } 
                              countryList={ this.state.countryList } 
                              onItemAddedToCart={this.handleCartQuantityUpdate} 
                              isMobile={isMobile} 
                              orientation={orientation} />

                </React.Fragment>
            }
          </div>

            {
              this.state.cartVisible ?
                <React.Fragment>
                  <div className="container-details">
                    <div className="closeIconWindow" onClick={ this.handleCartClick } alt="close icon"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                        <path d="M3.13341 23.0834L0.916748 20.8667L9.78341 12L0.916748 3.13335L3.13341 0.916687L12.0001 9.78335L20.8667 0.916687L23.0834 3.13335L14.2167 12L23.0834 20.8667L20.8667 23.0834L12.0001 14.2167L3.13341 23.0834Z" />
                      </svg>
                    </div> 
                    <Cart cartList={this.state.cartItems}
                          onEditingCartItem={this.handleCartQuantityUpdate}
                          onRemovingCartItem={this.handleCartItemDelete}
                          cartTotal={this.state.cartSubtotal}
                          onClickingCancel={this.handleCartClick}
                          onClickingCheckout={this.handleCheckingOut}/>
                  </div>
                </React.Fragment>
              :
              this.state.newItemAddedSuccessful || this.state.deleteWarningVisible || this.state.checkoutCompleteVisible ?
                <React.Fragment>
                  <div className="container-details" id="popupStyle">
                    <div className="deleteWarning">
                      <p className="deleteWarningText">{ this.state.deleteWarningVisible ? `Are you sure you want to delete ${this.state.selectedItem.name}?` : this.state.newItemAddedSuccessful ? `You've successfully added ${this.state.itemsList[this.state.itemsList.length - 1].name}.` : 'Purchase successfull. Thanks for shopping.' }</p>
                      <div className="deleteWdgButtons">
                        <button type="submit" className="cartButtonList" id="doneButton" onClick={this.handleCancelingMessage}><span className="buttonTextList">{this.state.deleteWarningVisible ? `Cancel` : `Done`}</span></button>
                        {
                          this.state.deleteWarningVisible ?
                            <button type="submit" className="cartButtonList deleteButton" onClick={() => this.handleDeletingItem(this.state.selectedItem.id)}><span className="buttonTextSolid">Delete Bean</span></button>
                          : null
                        }
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              :
              this.state.editItemFormVisible ?
                <React.Fragment>
                  <div className="container-details">
                    <div className="closeIconWindow" onClick={ this.handleEditClick } alt="close icon"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                        <path d="M3.13341 23.0834L0.916748 20.8667L9.78341 12L0.916748 3.13335L3.13341 0.916687L12.0001 9.78335L20.8667 0.916687L23.0834 3.13335L14.2167 12L23.0834 20.8667L20.8667 23.0834L12.0001 14.2167L3.13341 23.0834Z" />
                      </svg>
                    </div>
                    <EditItemForm item={ this.state.selectedItem }
                                  countryList={ this.state.countryList }
                                  onEditingItem={ this.handleEditingItem } 
                                  onClickingCancel={ this.handleCancelingEditForm } />
                  
                  </div>
                </React.Fragment>
              :
              this.state.selectedItem !== null ?
                <React.Fragment>
                
                  <div className="container-details">
                    <div className="closeIconWindow" onClick={ this.handleReturningToList } alt="close icon"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                        <path d="M3.13341 23.0834L0.916748 20.8667L9.78341 12L0.916748 3.13335L3.13341 0.916687L12.0001 9.78335L20.8667 0.916687L23.0834 3.13335L14.2167 12L23.0834 20.8667L20.8667 23.0834L12.0001 14.2167L3.13341 23.0834Z" />
                      </svg>
                    </div>
                    <ItemDetail item={ this.state.selectedItem }
                                countryList={ this.state.countryList }
                                onClickingDelete={ this.handleDeletingWarning }
                                onClickingEdit={ this.handleEditClick } 
                                onNewCartItem={ this.handleAddToCartClick } 
                                onQuantityCreation={ this.handleAddToCartClick } />
                  </div>
                </React.Fragment>
              :
              this.state.newItemFormVisible ?
                <React.Fragment>
                  <div className="container-details">
                    <div className="closeIconWindow" onClick={ this.handleClick } alt="close icon"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                        <path d="M3.13341 23.0834L0.916748 20.8667L9.78341 12L0.916748 3.13335L3.13341 0.916687L12.0001 9.78335L20.8667 0.916687L23.0834 3.13335L14.2167 12L23.0834 20.8667L20.8667 23.0834L12.0001 14.2167L3.13341 23.0834Z" />
                      </svg>
                    </div>
                    <NewItemForm onNewItemCreation={ this.handleAddingNewItem } 
                                onClickingCancel={this.handleClick}
                                countryList={ this.state.countryList } />
                  </div>
                </React.Fragment>
              : null
            }
            <div className={`menuBar ${this.state.menuBarVisible ? "open" : ""}`}></div>
            <div className={`menuScreen ${this.state.menuBarVisible ? "open" : ""}`} onClick={this.handleExitMenu}></div>
            <div className="menuBarContainer">
              {
                this.state.menuBarVisible && (
                  <React.Fragment>
                    <div className="menuCloseIcon"> 
                      <img src={closeIcon} onClick={ this.handleMenuClick } alt="close icon" />
                    </div>
                    <MenuList handleShopClick={this.handleShopClick}
                              handleMenuClick={this.handleMenuClick} 
                              mobileMenu={true} />
                    <div className="inventory-widget"> </div>
                    <InventoryWidget itemsList={ this.state.itemsList } 
                                    onAddBeanClick={ this.handleAddBeanClick } />
                  </React.Fragment>
                )
              }
            </div>
            </div>
          
          
      </React.Fragment>
    );
  }  
}

export default withHooksHOC(MenuController);
