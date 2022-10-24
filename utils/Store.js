const { createContext, useReducer } = require("react");
import Cookies from 'js-cookie';

export const Store = createContext(); //1. Creo un contexto de nombre Store

const initialState = {
  //2. Creo el initialState
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')):
  {cartItems: []}
};

function reducer(state, action) {
  //3. Creo un reducer, mando el state y el action
  switch (
    action.type //4. abro switch con la propiedad type de action
  ) {
    case "CART_ADD_ITEM": { // 5. y en caso de que sea igual a CART_ADD_ITEM, haga lo siguiente
      const newItem = action.payload; //primero creo una variable con lo que haiga en action.payload
      const existItem = state.cart.cartItems.find(//segundo creo una variable y busco en el estado
        (item) => item.slug === newItem.slug  //que el item.slug del estado sea igual al newItem.slug y lo guarde
      );
      const cartItems = existItem //Creo una variable y si existe el item
        ? state.cart.cartItems.map((item) =>//que me haga un recorrido del estado
            item.name === existItem.name ? newItem : item //y si item.name es exactamente igual a existItem.name que guarde newItem caso contrario solo item
          )
        : [...state.cart.cartItems, newItem]; //en caso de que no exista, que me traiga lo que tiene en cartItems del estado y le agregue el newItem
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }; // y lo que retorna es el estado, mas carItems
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item)=> item.slug !== action.payload.slug
      )
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return {...state, cart: {...state.cart, cartItems}}
    }
    default:
      return state; //siempre retorn algo en este caso state
  }
}

export function StoreProvider({ children }) {//ahora si creo mi componente StoreProvider y que los hijos puedan acceder
  const [state, dispatch] = useReducer(reducer, initialState); //Uso el usereduce, le paso la funcion reducer, el estado inicial,
  const value = { state, dispatch }; //lo asigno  como objeto
  return <Store.Provider value={value}>{children}</Store.Provider>; // y retorno el componente  con el valor a todos los hijos
}
