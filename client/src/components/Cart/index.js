import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './cart.css';
import { useNavigate, Link } from "react-router-dom";
import { HiShoppingCart } from 'react-icons/hi';
import { UPDATE_USER } from '../../utils/mutations'

const Cart = () => {

  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();
  
  const { data } = useQuery(QUERY_USER)
  let user;
  if (data) {
    user = data.user
  }

  const [updateUser] = useMutation(UPDATE_USER);
  let sum = 0;


  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  async function submitCheckout(event) {
    event.stopPropagation()
    let updateFirstName = user.firstName
    let updateLastName = user.lastName
    let updateBitcoin = (user.bitcoin - sum)
    let updateEmail = user.email
    try {
      const { data } = await updateUser({
        variables: {
          email: updateEmail,
          firstName: updateFirstName,
          lastName: updateLastName,
          bitcoin: updateBitcoin,
        },
      });

      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
    navigate("/success");
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <HiShoppingCart className='giticon' />
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      {Auth.loggedIn() ?
        (
          <h2>Shopping Cart Wallet: ฿{user.bitcoin}</h2>
        ) : (
          <h2>Shopping Cart</h2>
        )
      }
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ฿{calculateTotal()}</strong>
            {!Auth.loggedIn() ? 
              (
              <span style={{ fontSize: '18px', width: '100%' }}>(log in to check out)</span>
              ) : (user.bitcoin-sum > 0 ? (<button onClick={submitCheckout}>Checkout</button>
              ) : (<span style={{ fontSize: '18px', width: '100%' }}>(Not enough bitcoins!)</span>)
              ) 
            }
          </div>
        </div>
      ) : (
        <h3>
          <span className='shake' lrole="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
