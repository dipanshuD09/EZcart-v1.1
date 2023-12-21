import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
//import axios from "axios";
//import products from "../products"

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [product, setProduct] = useState([]);

  // useEffect(() => {
  //     const fetchProduct = async () => {
  //         const {data} = await axios.get(`/api/products/${productId}`)
  //         setProduct(data);
  //     };
  //     fetchProduct();
  // }, []);

  const [qty, setqty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    //navigate('/cart');
  }


  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md="5">
              <ListGroup>
                <img src={product.image} alt={product.name} fluid />
              </ListGroup>
            </Col>
            <Col md="4">
              <ListGroup variant="flush">
                <ListGroup.Item>{product.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                         {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty.</Col>
                              <Col>
                                <Form.Control
                                  as='select'
                                  value={qty}
                                  onChange={(e) => setqty(Number(e.target.value))}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                      <option key={x+1} value={x+1}>
                                        {x+1}
                                      </option>
                                    ))}
                                  </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                         )}   

                  <ListGroup.Item>
                    <Row>
                      <Button
                        className="btn-block my-1"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Buy Now
                      </Button>
                    </Row>
                    <Row>
                      <Button
                        className="btn-block my-1"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
