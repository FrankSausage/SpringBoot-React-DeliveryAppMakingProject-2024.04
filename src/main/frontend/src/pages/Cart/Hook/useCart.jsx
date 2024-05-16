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

  const minusItemQuantity = () => {
    
  }

  const getPrice = async () => {
    try {
      let items = JSON.parse(localStorage.getItem('cartItems'));
      let totalPrice = 0;

      items.map((menuItems) => {
        totalPrice += menuItems.menuPrice;
        menuItems.menuOptions.map((optionItems) =>{
          totalPrice += optionItems.price;
        })
      })
      return await totalPrice;

    } catch (error) {
      console.log(error)
    }
  }

  return { addItemToCart, getPrice }
}