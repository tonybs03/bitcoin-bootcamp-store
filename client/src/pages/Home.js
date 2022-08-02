import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


const Home = () => {

  const { data } = useQuery(QUERY_USER);
  let bitcoin;
  let firstName;
  let lastName;
  let email;

  if (data) {
    bitcoin = data.user.bitcoin;
    firstName = data.user.firstName
    lastName = data.user.lastName
    email = data.user.email
  }

  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart bitcoin = {bitcoin} firstName = {firstName} lastName = {lastName} email = {email}/>
    </div>
  );
};

export default Home;
