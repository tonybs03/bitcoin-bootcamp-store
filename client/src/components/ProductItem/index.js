import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import "./ProductItem.css"

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="px-1 py-1 eachproduct">
      <Link to={`/products/${_id}`}>
        <div style={{width:"100%", aspectRatio:"1", display:'flex', alignItems:'center'}}>
          <img alt={name} src={`/images/${image}`} style={{width:"100%"}}/>
        </div>
      </Link>
      <Link to={`/products/${_id}`}>
        <div style={{height: "70px"}}>
          <p style={{textDecoration:"none", fontFamily:"Raleway"}}>{name}</p>
        </div>
      </Link>  
      <div style={{textDecoration:"none", fontFamily:"Raleway", fontWeight:"bolder"}}>
        <span><b>฿{price}</b></span>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
