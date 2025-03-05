import { withHooksHOC } from './withHooksHOC';

function MenuList({handleShopClick, handleMenuClick, mobileMenu, isMobile, isWdDesktop, translateY, isTablet, translateYTablet, 
  isTabletPor, translateYTabletPor, translateYNrw, isScrolled, isDesktop,
  isScrolledNrw, isScrolledTabletPor, isScrolledTablet, orientation}) {

  return (
    <ul 
      className={`${mobileMenu ? "menuMobile" : "menuContent"}`}
      style={{
        transform: !isMobile && (orientation === "portrait") && (window.innerHeight > 960)
                    ? "none"
                    : mobileMenu
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
      <li className={`menuList ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) ||  (isTabletPor && isScrolledTabletPor) ? "shopScrolled" : ""}`} 
          onClick={handleShopClick}>shop</li>
      { !mobileMenu && (
        <li className="listContainer"><h3 className={`menuList ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) ||  (isTabletPor && isScrolledTabletPor) ? "listScrolled" : ""}`} onClick={handleMenuClick}>inventory</h3></li>
      )}
      <li className={`menuList ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) || (isTabletPor && isScrolledTabletPor) ? "listScrolled" : ""}`} title="I'm static - checkout 'shop' or 'inventory'">about us</li>
      <li className={`menuList ${(isWdDesktop && isScrolled) || (isDesktop && isScrolledNrw) || (isTablet && isScrolledTablet) || (isTabletPor && isScrolledTabletPor) ? "listScrolled" : ""}`} title="I'm static - checkout 'shop' or 'inventory'">contact</li>
    </ul>
  );
}

export default withHooksHOC(MenuList);