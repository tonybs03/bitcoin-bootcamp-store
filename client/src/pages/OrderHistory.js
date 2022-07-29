import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { useMutation } from '@apollo/client';
import {UPDATE_USER} from '../utils/mutations'

function OrderHistory() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addBitcoin, setAddBitcoin] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  let count = 0;

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if(firstName === ''){
        setFirstName(user.firstName)
      }
      if(lastName === ''){
        setLastName(user.lastName)
      }
      if(email === ''){
        setEmail(/*user.email*/ 'email@fakemail.com')
      }
      if(password === ''){
        setPassword(/*user.password*/ 'password12345')
      }
      if(addBitcoin === ''){
        setAddBitcoin(0)
      }else {
        setAddBitcoin(user.bitcoin+addBitcoin)
      }
      
      const { data } = await updateUser({
        variables: { firstName, lastName, addBitcoin, email, password },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>
        {user ? (
          <>
            <h2><b>
              Welcome {user.firstName} {user.lastName}
            </b></h2>
            <div className='flex-row'>
              <div>
                <h3><u><b>User Information</b></u></h3>
                <h4>Bitcoin wallet: ฿{user.firstName}</h4>
                <h4>Total orders placed: {user.orders.forEach((order) => {
                  order.products.forEach(() => count++)
                })} {count}</h4>
                <h4>You are at: # on the leaderboard</h4>
              </div>

              <div>
                <h3><u><b>Update Information</b></u></h3>
                <form>
                  <input
                    placeholder='first name'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  ></input>
                  <input
                    placeholder='last name'
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  ></input>
                  <input
                    placeholder='add bitcoin'
                    value={addBitcoin}
                    onChange={(event) => setAddBitcoin(event.target.value)}
                  ></input>
                  <input
                    placeholder='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  ></input>
                  <input
                    placeholder='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  ></input>
                  <div>
                    <button type='submit'>Submit</button>
                  </div>

                </form>
              </div>
            </div>

            <h3><u><b> Order History </b></u></h3>

            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h5>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h5>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>฿{price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
