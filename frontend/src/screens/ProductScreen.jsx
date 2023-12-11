import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
//import products from "../products"

const ProductScreen = () => {
    const { id: productId } = useParams();
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${productId}`)
            setProduct(data);
        };
        fetchProduct();
    }, []);
    
  return (
    <>
        <Link className="btn btn-light my-3" to="/">Go Back</Link>
        <Row>
            <Col md="5">
                <ListGroup><img src={product.image} alt={product.name} fluid /></ListGroup>
            </Col>
            <Col md="4">
                <ListGroup variant="flush">
                    <ListGroup.Item>{product.name}</ListGroup.Item>
                    <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                    <ListGroup.Item>{product.price}</ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Buy Now
                                </Button>
                            </Col>
                            <Col>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen