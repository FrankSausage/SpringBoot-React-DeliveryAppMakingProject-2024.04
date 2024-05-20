import { useMutation } from "@tanstack/react-query";

export function useCart () {

  const addItemToCart = async (itemData) => {
    try {
      if(!localStorage.getItem('cartItems')){
        localStorage.setItem('cartItems', JSON.stringify([{...itemData.menus, ['quantity'] : 1, ['sequence']: 1}]))
      } else {
        // storeId 다를 시 cartItems 삭제 후 새로 등록 로직 구현 필요
        let item = JSON.parse(localStorage.getItem('cartItems'));
        item.push({...itemData.menus, ['quantity'] : 1, ['sequence']: (1 + item.length)});
        return await localStorage.setItem('cartItems', JSON.stringify(item))
      }
    } catch (error) {
      alert('장바구니 담기에 실패했습니다!')
      console.log(error)
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
      localStorage.setItem('cartItems', JSON.stringify(newCartItem))
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
      return await totalPrice;

    } catch (error) {
      console.log(error)
    }
  }

  return { addItemToCart, getPrice, minusItemQuantity, plusItemQuantity, deleteItemFromCart }
}