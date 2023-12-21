import { Nav, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className="justify-content-center mb-4">
        <Nav.Item>
            { step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link><h5>Sign In</h5></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><h5>Sign In/Register</h5></Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            { step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link><h5>Shipping</h5></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><h5>Shipping</h5></Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            { step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link><h5>Payment</h5></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><h5>Payment</h5></Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            { step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link><h5>Place Order</h5></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><h5>Place Order</h5></Nav.Link>
            ) }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps