import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        matgin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
