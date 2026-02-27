// import React from "react";
// import { Link } from "react-router-dom";

// const Orders = () => {
//   return (
//     <div className="orders">
//       <div className="no-orders">
//         <p>You haven't placed any orders today</p>

//         <Link to={"/"} className="btn">
//           Get started
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Orders fetch error:", err));
  }, []);

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders today</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-box">
            {/* 🔹 Main Row */}
            <div
              className="order-row"
              onClick={() => toggleOrder(order._id)}
            >
              <div className="left">
                <span className="stock">{order.name}</span>
                <span
                  className={`mode ${
                    order.mode === "BUY" ? "buy" : "sell"
                  }`}
                >
                  {order.mode}
                </span>
              </div>

              <div className="right">
                <span className="qty">Qty {order.qty}</span>
                <span className="price">₹{order.price}</span>
              </div>
            </div>

            {/* 🔽 Dropdown */}
            {openOrderId === order._id && (
              <div className="order-dropdown">
                <div>
                  <strong>Order Type:</strong> Market
                </div>
                <div>
                  <strong>Status:</strong> Completed
                </div>
                <div>
                  <strong>Time:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
