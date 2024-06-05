export function useCart () {

  const addItemToCart = async (itemData, deliveryTip, minDeliveryPrice) => {
    try {
      if(!localStorage.getItem('cartCount')) {
        localStorage.setItem('cartCount', 1);
      } 

      if(!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([{...itemData.menus, ['quantity'] : 1, ['sequence']: 1, ['deliveryTip']: deliveryTip, ['minDeliveryPrice']: minDeliveryPrice}]))
      } else {
        let item = JSON.parse(localStorage.getItem('cartItems'));
        
        if(itemData.menus.storeId === item[0].storeId) {
          for(let i = 0; i < item.length; i++) {
            if(itemData.menus.menuId === item[i].menuId && itemData.menus.menuOptions.length === item[i].menuOptions.length) {
              let isSame = true;            
              for(let x = 0; x < itemData.menus.menuOptions.length; x++) {
                if(!item[i].menuOptions.some(v => v.menuOptionId === itemData.menus.menuOptions[x].menuOptionId)){
                  isSame = false;
                  break;
                }
              }
              if (isSame) {
                return await plusItemQuantity(i);
              }
            }
          }
          
          item.push({...itemData.menus, ['quantity'] : 1, ['sequence']: (1 + item.length)});
          localStorage.setItem('cartCount', item.length);
          return await localStorage.setItem('cartItems', JSON.stringify(item))
        } else {
          if(window.confirm('다른 가게의 주문이 이미 장바구니에 있습니다, 장바구니를 비우고 이 가게에서 새로 주문하시겠습니까?')) {
            return await localStorage.setItem('cartItems', JSON.stringify([{...itemData.menus, ['quantity'] : 1, ['sequence']: 1, ['deliveryTip']: deliveryTip, ['minDeliveryPrice']: minDeliveryPrice}]))
          }
        }
      }
    } catch (error) {
      alert('장바구니 담기에 실패했습니다!');
      console.log(error);
      return await false;
    }
  }

  const minusItemQuantity = async (index) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const newCart = [];
      
      for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i] === cartItems[index]){
          if(cartItems[i].quantity-1 <= 0 ) {
            deleteItemFromCart(i)
          } else {
            newCart.push({...cartItems[i], ['quantity'] : (cartItems[i].quantity-1)})
          }
        } else {
          newCart.push(cartItems[i])
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      return await true;
    
    } catch (error) {
      console.error(error)
    }
  }
  
  const plusItemQuantity = async (index) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const newCart = [];
      
      for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i] === cartItems[index]){
          if(cartItems[i].quantity >= 9 ) {
            alert('더 이상 담을 수 없습니다.')
            newCart.push({...cartItems[i], ['quantity'] : (cartItems[i].quantity)})
          } else {
            newCart.push({...cartItems[i], ['quantity'] : (cartItems[i].quantity+1)})
          }
        } else {
          newCart.push(cartItems[i])
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(newCart))
      return await true;
      
    } catch (error) {
      console.error(error)
    }
  }

  const deleteItemFromCart = async (index) => {
    try { 
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const newCartItem = cartItems.filter(e => e !== cartItems[index]);
      if(newCartItem.length<=0) {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartCount');
        return await true;
      }
      localStorage.setItem('cartItems', JSON.stringify(newCartItem));
      localStorage.setItem('cartCount', (localStorage.getItem('cartCount') -1));
      return await true;

    } catch(error) {
      console.error(error)
    }
  }

  const getPrice = async () => {
    try {
      let items = JSON.parse(localStorage.getItem('cartItems'));
      let totalPrice = 0;

      items.map((menuItems) => {
        totalPrice += (menuItems.menuPrice * menuItems.quantity);
        menuItems.menuOptions.map((optionItems) =>{
          totalPrice += (optionItems.price * menuItems.quantity);
        })
      })
      return await (totalPrice + items[0].deliveryTip);

    } catch (error) {
      console.log(error)
    }
  }

  return { addItemToCart, getPrice, minusItemQuantity, plusItemQuantity, deleteItemFromCart }
}