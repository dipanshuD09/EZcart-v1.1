import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  return (
    <>
      <h1>Your Order Has Been Placed Successfully</h1>
      <h3>Thankyou for shopping with us...</h3>
      <Link className="btn btn-warning my-3" to="/">
        Continue Shopping
      </Link>
    </>
  );
};

export default OrderScreen;
