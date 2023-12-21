import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const UserOrdersScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <h1>Order History</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <ListGroup variant="flush">
          {orders.map((order) =>
            order.orderItems.map((item) => (
              <ListGroup.Item>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                    <Row>
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none" }}
                    >
                      {item.name}
                    </Link>
                    </Row>
                    <Row className="px-2">
                    Order Date: {order.createdAt.substring(0, 10)}
                    </Row>
                  </Col>
                  <Col>
                  <Row>
                    Order: {order._id}
                  </Row>
                  <Row>
                    <Col className="px-0">
                    Price: ${item.price}
                    </Col>
                    <Col>
                    Payment: {order.paymentMethod}
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </>
  );
};

export default UserOrdersScreen;
