import React from "react";
import { withHooksHOC } from './withHooksHOC';
import Header from './Header';
import EditItemForm from "./EditItemForm";
import ItemDetail from "./ItemDetail";
import NewItemForm from "./NewItemForm";
import ItemsList from "./ItemsList";
import InventoryWidget from "./InventoryWidget";
import Cart from "./Cart";
import { v4 } from 'uuid';

import colImg from "./../img/colombiaBag.png";
import colImgNo from "./../img/colombiaBagNoName.png";
import colFlag from "./../img/colombiaFlag.png";
import brazilImg from "./../img/brazilBag.png";
import brazilFlag from "./../img/brazilFlag.png";
import indiaImg from "./../img/indiaBag.png";
import indiaFlag from "./../img/indiaFlag.png";
import philImg from "./../img/philBag.png";
import philFlag from "./../img/philFlag.png";
import closeIcon from "./../img/closeIcon.png";

class MenuController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      itemsList: [ { name: 'Arabica', origin: 'Colombia', roast: 'medium', description: 'Our Arabica beans produce the highest-quality coffee, smooth and sweet with complex and intricate flavor undertones that may include fruit, sugar or chocolate. They will usually contain just enough acidity and very little bitterness.', price: 15, quantity: 130, notification: '', id: v4() }, { name: 'Robusta', origin: 'Brazil', roast: 'dark', description: 'Robusta coffee is stronger with a heavier body. It has a slight-bitter taste, but still smooth and robust with a fragrant aroma. It\'s deep flavor profile stands up well to creamer, milk, sugar, and other added ingredients.', price: 14, quantity: 130, notification: "", id: v4() }, { name: 'Liberica', origin: 'Phillipines', roast: 'light', description: 'A less caffeinated bean, with a nutty bold taste, and a floral aroma. It\'s unique profile is suited to those looking for a lighter cup of coffee, but enjoy the unique flavor notes this been produces. ', price: 17, quantity: 130, notification: "", id: v4() }, { name: 'Excelsa', origin: 'India', roast: 'light', description: 'Our excelsa beans have a tart, fruity flavor for a light roast, but with additional notes that are more like those you\'d find in a dark roast. This exceptional bean is a rare treat, many feel it produces the tastiest of cup of coffee.', price: 21, quantity: 130, notification: "", id: v4() } ],
      countryList: [ 
                  {origin: 'Colombia', flag: colFlag, cpImg: colImg, cpImgNo: colImgNo}, 
                  {origin: 'Brazil', flag: brazilFlag, cpImg: brazilImg, cpImgNo: colImgNo},
                  {origin: 'India', flag: indiaFlag, cpImg: indiaImg, cpImgNo: colImgNo},
                  {origin: 'Phillipines', flag: philFlag, cpImg: philImg, cpImgNo: colImgNo} ]
    };
  }

  handleMenuClick = () => {
    this.setState(prevState => ({
      menuBarVisible: !prevState.menuBarVisible,
    }));
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      const total = this.state.cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantityPurchase * parseInt(item.price);
      }, 0);
      this.setState({
        cartSubtotal: total
      });
    }
  }

  render() {
    const { screenChange } = this.props;
    return (
      <React.Fragment>
        <div className="appContainer">
          <div className="topNav"></div>
          <div className="leftPage"></div>
          <div className="centerPage"> 
            <div className="centerGradient"></div>
            <Header /> 
          </div>
          <div className="centerPageBottom">
            {
              screenChange && this.state.selectedItem !== null ? 
                null
              : 
                <React.Fragment>
                  <ItemsList itemsList={ this.state.itemsList } 
                            onItemSelection={ this.handleChangingSelectedItem } 
                            countryList={ this.state.countryList } />

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
                      <button type="submit" className="cancelButton" id="doneButton" onClick={this.handleCancelingMessage}><span className="buttonText">{this.state.deleteWarningVisible ? `Cancel` : `Done`}</span></button>
                      {
                        this.state.deleteWarningVisible ?
                          <button type="submit" className="deleteButton" onClick={() => this.handleDeletingItem(this.state.selectedItem.id)}><span className="buttonTextSolid">Delete Bean</span></button>
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
          <div className="rightPage">
            {/* <div className="cartContainer" >
              <h3 className="cart" onClick={this.handleCartClick}>cart</h3>
              <div className="cartCountContainer" onClick={this.handleCartClick}>
                <svg className="cartCircle" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <circle cx="9.5" cy="9.5" r="9.5" fill="#343434"/>
                </svg>
                <h3 className="cartCount">{this.state.cartItems.length}</h3>
              </div>
            </div> */}
          </div>
          <div className="footer">
            <h4 className="footerText">Crafted with care, <span className="footerBreak"><br /></span>from soil to cup </h4>
          </div>
          {
            this.state.menuBarVisible ?
              <React.Fragment>
                <div id="menuBar"></div>
                <div id="menuScreen" onClick={this.handleExitMenu}></div>
              </React.Fragment>
            :
              null
          }
          <div className="menuIconContainer">
            {
              this.state.menuBarVisible ?
                <React.Fragment>
                  <div className="menuCloseIcon"> 
                    <img src={closeIcon} onClick={ this.handleMenuClick } alt="close icon" />
                  </div>
                    <ul className="menuContent">
                      <li className="menuList" onClick={this.handleCartClick}>cart</li>
                      <li className="menuList" onClick={this.handleMenuClick}>products</li>
                      <li className="listContainer"><h3 className="menuList" title="I'm static - checkout 'cart' or '+add new bean' below">shop</h3></li>
                      <li className="menuList" title="I'm static - checkout 'cart' or '+add new bean' below">about us</li>
                      <li className="menuList" title="I'm static - checkout 'cart' or '+add new bean' below">contact</li>
                    </ul>
                    <div className="inventory-widget"> </div>
                    <InventoryWidget itemsList={ this.state.itemsList } 
                                    onAddBeanClick={ this.handleAddBeanClick } />
                </React.Fragment>
                
              : 
                <div className="menuIcon">
                  {
                    this.state.newItemFormVisible || this.state.editItemFormVisible || this.state.deleteWarningVisible || this.state.cartVisible || this.state.checkoutCompleteVisible || this.state.selectedItem !== null ?
                      <div className="disabled"></div>
                    :
                      <svg onClick={this.handleMenuClick} xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 20 13" fill="none">
                        <path d="M0 13V10.8333H20V13H0ZM0 7.58333V5.41667H20V7.58333H0ZM0 2.16667V0H20V2.16667H0Z" />
                      </svg>
                  }
                </div>  
            }
          </div>
          <div className="cartContainer" >
            <h3 className="cart" onClick={this.handleCartClick}>cart</h3>
            <div className="cartCountContainer" onClick={this.handleCartClick}>
              <svg className="cartCircle" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <circle cx="9.5" cy="9.5" r="9.5" />
              </svg>
              <h3 className="cartCount">{this.state.cartItems.length}</h3>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }  
}

export default withHooksHOC(MenuController);
