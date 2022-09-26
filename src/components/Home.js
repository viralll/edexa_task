import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useHistory();
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();
    const { name, email, date, password } = inpval;
    if (name === "") {
      toast.error(" name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (date === "") {
      toast.error("date field is requred", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      const existingUser = localStorage.getItem("registerUser");
      let parseUser = existingUser ? JSON.parse(existingUser) : [];
      localStorage.setItem(
        "registerUser",
        JSON.stringify([...parseUser, inpval])
      );
      history.push("/login");
      console.log("data added succesfully");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between wrapper m-auto">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center mb-4">Sign Up</h3>
            {/* user form */}
            <Form>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Enter Your Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control onChange={getdata} name="date" type="date" />
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-12 mt-3"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Register?{" "}
              <span>
                <NavLink to="/login">SignIn</NavLink>
              </span>{" "}
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
