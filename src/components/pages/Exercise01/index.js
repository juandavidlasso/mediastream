/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState, useCallback } from 'react'

export default function Exercise01 () {
  const movies = [
    {id: 1,name: 'Star Wars',price: 20, quantity: 0},
    {id: 2,name: 'Minions',price: 25, quantity: 0},
    {id: 3,name: 'Fast and Furious',price: 10, quantity: 0},
    {id: 4,name: 'The Lord of the Rings',price: 5, quantity: 0}
  ]

  const discountRules = [
    {m: [3, 2],discount: 0.25},
    {m: [2, 4, 1],discount: 0.5},
    {m: [4, 2],discount: 0.1} 
  ]

  const [cart, setCart] = useState([])
  const array = []

  // Obtener item array
  const itemArray = useCallback(() => {
    cart.map( (item) => array.push(item.id))
  }, [cart])

  itemArray()

  // Increment
  const increaseQuantity = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o ) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      })
    );
  };

  // Decrement
  const decreaseQuantity = (x, i) => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          } else {
            removeFromCart(x);
          }
        }
        return item;
      })
    );
  };

  // Remove
  const removeFromCart = i => {
    const newArray = cart.filter((item) => item.id !== i.id);
    setCart(newArray)
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
  let cartPriceTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0 );
  // Compare array
  const getResult = function (a1, a2) {
    var i = a1.length;
    if (i !== a2.length) return false;
 
    while (i--) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  };

  // Descount
  let aply = []
  let pay = 0
  let desc = []
  const obtenerDescuento = useCallback(() => {
    discountRules.map( (desCount) => {
      const {m, discount} = desCount
      const arraySort1 = array.sort()
      const arraySort2 = m.sort()
      if(getResult(arraySort1, arraySort2) === true) {
        aply.push(1)
        desc.push(discount)
      } else {
        aply.push(0)
      }
      const found = aply.find(element => element === 1);
      found === 1 ? pay = ( cartPriceTotal - (cartPriceTotal*desc[0])) : pay = cartPriceTotal
      return pay;
    })
  }, [cart])

  obtenerDescuento()

  const getTotal = () => 
    cartCountTotal === 0 ?
    (
      <b>0</b>
    ) 
    : 
    (
      <>
        {pay}
      </>
    );

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map( (o,i) => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => setCart([...cart, {id: o.id,name: o.name,price: o.price, quantity: 1}])}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map( (x, i) => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decreaseQuantity(x, i)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => increaseQuantity(i)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
} 