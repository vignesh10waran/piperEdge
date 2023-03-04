import React, { useState, useEffect } from "react";

function MyComponent() {
  const total = [0];
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [discounts, setDiscounts] = useState({});

  useEffect(() => {
    fetch("https://piperedge.com/screening-test/assets/json/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const vendorSet = new Set(data.map((item) => item.vendor));
        setVendors(Array.from(vendorSet));

        const discountObj = {};
        for (const item of data) {
          if (!discountObj[item.vendor]) {
            discountObj[item.vendor] = {
              tradeA: 0,
              tradeB: 0,
              tradeC: 0,
              tradeD: 0,
            };
          }

          if (item.trade === "A") {
            discountObj[item.vendor].tradeA = item.discount;
          } else if (item.trade === "B") {
            discountObj[item.vendor].tradeB = item.discount;
          } else if (item.trade === "C") {
            discountObj[item.vendor].tradeC = item.discount;
          } else if (item.trade === "D") {
            discountObj[item.vendor].tradeD = item.discount;
          }
        }
        setDiscounts(discountObj);
      })
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  function findDiscount(price, discount) {
    let sumOf = (price * discount) / 100;
    let discountprice = price - sumOf;
    total.push(discountprice);
    totalfun();
    return discountprice;
  }

  const totalfun = () => {
    return total.reduce((e, acc) => e + acc);
  };

  return (
    <>
      <div className="main-head">
        <div className="inner-main-head">
          <h3>Discount table</h3>
          <table className="table" border={1}>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Trade A</th>
                <th>Trade B</th>
                <th>Trade C</th>
                <th>Trade D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vendor 1</td>
                <td>29</td>
                <td>25</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Vendor 2</td>
                <td>N/A</td>
                <td>25</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Vendor 3</td>
                <td>12</td>
                <td>N/A</td>
                <td>3</td>
                <td>56</td>
              </tr>
              <tr>
                <td>Vendor 4</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>34</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Vendor 5</td>
                <td>N/A</td>
                <td>15</td>
                <td>N/A</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="main-head">
        <div className="inner-main-head">
          <h3>Products Tables</h3>
          <table className="table" border={1}>
            <thead className="table-head">
              <tr>
                <th>S.NO</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Tags</th>
                <th>Vendor</th>
                <th>Cart</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.tags}</td>
                  <td>{item.vendor}</td>
                  <td>
                    <button
                      className="add-button"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="main-head">
        <div className="inner-main-head">
          <h3>Shopping List</h3>
          <table className="table" border={1}>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Product Name</th>
                <th>Org Price</th>
                <th>Discount Percentage</th>
                <th>Discount Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <>
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{findDiscount(item.price, item.discount)}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => removeFromCart(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
            <tr>
              <td colSpan={6}>
                <h1>Total {totalfun()}</h1>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyComponent;
