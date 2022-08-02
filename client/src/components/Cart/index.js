import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './cart.css';
import { Link } from "react-router-dom";
import { HiShoppingCart } from 'react-icons/hi';
import {UPDATE_USER} from '../../utils/mutations'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = (props) => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [updateUser] = useMutation(UPDATE_USER);
  let sum = 0;
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

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

  async function submitCheckout () {
    let updateFirstName = props.firstName
    let updateLastName = props.lastName
    let updateBitcoin = (props.bitcoin - sum)
    let updateEmail = props.email
    try {
      const {data} = await updateUser({
        variables: {
          email: updateEmail,
          firstName: updateFirstName,
          lastName: updateLastName,
          bitcoin: updateBitcoin,
        },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
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
      <h2>Shopping Cart Wallet: ฿{props.bitcoin}</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ฿{calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              // <button onClick={submitCheckout}>Checkout</button>
              <Link to="/success">
                <button onClick={submitCheckout}>Checkout</button>
              </Link>
            ) : (
              <span style={{ fontSize: '18px', width: '100%' }}>(log in to check out)</span>
            )}
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
