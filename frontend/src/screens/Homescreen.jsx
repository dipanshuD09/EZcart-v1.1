//import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";
//import axios from 'axios';
//import products from "../products"
import Loader from "../components/Loader";
import Product from "../components/product";
import Message from "../components/Message";

const Homescreen = () => {
  //const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);
  const { data: products, isLoadong, error } = useGetProductsQuery();
  return (
    <>
      <h1>Latest Products</h1>

      {isLoadong ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Homescreen;
