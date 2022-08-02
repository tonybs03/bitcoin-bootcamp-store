import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations'

import Auth from '../utils/auth';

function OrderHistory() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bitcoin, setBitcoin] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateUser] = useMutation(UPDATE_USER);

  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  let count = 0;
  let countp = 0;


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let updateFirstName = firstName || user.firstName
    let updateLastName = lastName || user.lastName
    let updateBitcoin = (user.bitcoin + parseInt(bitcoin)) || user.bitcoin
    let updateEmail = email || user.email
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
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>
        {user ? (
          <>
            <h2 style={{marginTop:"30px"}}><b>
              Welcome {user.firstName} {user.lastName} {}
            </b></h2>
            <hr/>
            <hr/>
            <div className='flex-row space-between'>

              <div className='user-info'>
                <h3><u><b>User Information</b></u></h3>
                <h4 style={{width:"390px", marginTop:"15px"}}>Bitcoin wallet: ฿{user.bitcoin}</h4>
                <h4 style={{width:"390px", marginTop:"15px"}}>Total orders placed: {user.orders.forEach((order) => {
                  order.products.forEach(() => countp++)
                })} {countp}</h4>
                <h4 style={{width:"390px", marginTop:"15px"}}>Total orders placed: {user.orders.forEach(() => count++)} {count}</h4>
                <h4 style={{width:"390px", marginTop:"15px"}}>You are at: #123 on the leaderboard</h4>
              </div>

              <div className='update-info'>
                <h3><u><b>Update Information</b></u></h3>
                <form onSubmit={handleFormSubmit}>
                  <input
                    placeholder='first name'
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value)
                    }}
                    style={{width:"240px", marginTop:"15px"}}
                  ></input>
                  <input
                    placeholder='last name'
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value)
                    }}
                    style={{width:"240px", marginTop:"15px"}}
                  ></input>
                  <input
                    placeholder='add bitcoin'
                    value={bitcoin}
                    onChange={(event) => {
                      setBitcoin(event.target.value)
                    }}
                    style={{width:"240px", marginTop:"15px"}}
                  ></input>
                  <input
                    placeholder='email'
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                    }}
                    style={{width:"240px", marginTop:"15px"}}
                  ></input>
                  <div>
                    <button type='submit' style={{marginTop:"15px"}}>Submit</button>
                  </div>
                </form>
              </div>
              {/* <div className='user-info' style={{width:"40%"}}>
                <h3><u><b>User Information</b></u></h3>
                <h4>Bitcoin wallet: ฿{user.firstName}</h4>
                <h4>Total orders placed: {user.orders.forEach((order) => {
                  order.products.forEach(() => count++)
                })} {count}</h4>
                <h4>You are at: # on the leaderboard</h4>
              </div> */}
            </div>
            <br/>
            <br/>
            <br/>
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
                      </Link>
                      <div>
                        <p>{name}</p>
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
