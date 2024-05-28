export function useCart () {

  const addItemToCart = async (itemData) => {
    try {
      if(!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify([{...itemData.menus, ['quantity'] : 1, ['sequence']: 1}]))
      } else {
        let item = JSON.parse(localStorage.getItem('cartItems'));

        let isInside = false;
        let index = 0;
        for(let i = 0; i < item.length; i++) {
          if(itemData.menus.menuName===item[i].menuName && itemData.menus.menuOptions.length===0 && item[i].menuOptions.length===0) {
            return await plusItemQuantity(i);
          }

          if(itemData.menus.menuName===item[i].menuName && itemData.menus.menuOptions.length===item[i].menuOptions.length) {
            if(itemData.menus.menuOptions[0].options===item[i].menuOptions[0].options) {
              isInside = true;
              index = i;
              break;
            }
          }
        }

        if(isInside===true) {
          let count = 0;
          for(let i = 0; i < item[index].menuOptions.length; i++) {
            for(let x = 0; x < item[index].menuOptions.length; x++) {
              if (itemData.menus.menuOptions[i].options===item[index].menuOptions[x].options) {
                count++;
                break;
              }
            }
          }
          if(count===item[index].menuOptions.length) {
            return await plusItemQuantity(index);
          }
        }

        if(itemData.menus.storeId===item[0].storeId) {
          item.push({...itemData.menus, ['quantity'] : 1, ['sequence']: (1 + item.length)});
          return await localStorage.setItem('cartItems', JSON.stringify(item))
        } else {
          if(window.confirm('장바구니에 이미 등록한 가게와 다른 가게입니다, 장바구니를 비우고 새로 주문하시겠습니까?')) {
            return await localStorage.setItem('cartItems', JSON.stringify([{...itemData.menus, ['quantity'] : 1, ['sequence']: 1}]))
          }
        }
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