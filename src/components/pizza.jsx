import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { overwritePizzas } from "../redux/actions/pizzaActions";

export const Pizza = ({ pizza }) => {
  const [selectedVarient, setSelectedVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });

  return (
    <div>
      <div className="flex flex-col md:p-10">
        <h4 className="text-xl mb-3">{pizza?.name}</h4>
        <img src={pizza.image} className="" alt="" onClick={handleShow} />
        <div className="flex justify-center items-center">
          <div className="left  flex flex-col justify-center items-center mt-4">
            <h2 className="text-lg font-normal">Varients</h2>
            <select
              name=""
              id=""
              value={selectedVarient}
              onChange={(e) => {
                setSelectedVarient(e.target.value);
              }}
              className="mt-3 w-36 border-2 border-black"
            >
              {pizza?.varients.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="ml-7 right flex  flex-col justify-center items-center mt-4">
            <h2 className="text-lg font-normal">Quantity</h2>
            <select
              name=""
              id=""
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
              className="mt-3 w-24 border-2  border-black"
            >
              {console.log()}
              {[...Array(10).keys()].map((item) => {
                return <option value={item + 1}>{item + 1}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="left flex flex-col justify-center items-center mt-4">
            <h2 className="text-lg font-normal">Price</h2>
            <h3 className="text-xl">
              {pizza?.prices[0][selectedVarient] * quantity}Rs/-
            </h3>
          </div>
          <div className="right flex flex-col justify-center items-center mt-4 ml-5">
            <button
              onClick={() => {
                const isthere = cartItems.find((item) => {
                  return (
                    item.pizzaDetails._id === pizza._id &&
                    item.varient === selectedVarient
                  );
                });

                if (isthere) {
                  const oldCartItems = cartItems.filter(
                    (item) => item.pizzaDetails._id !== pizza._id
                  );
                  const newCartItems = [...oldCartItems];

                  dispatch(overwritePizzas(newCartItems));
                  dispatch(addToCart(pizza, quantity, selectedVarient));
                }

                if (isthere === undefined) {
                  dispatch(addToCart(pizza, quantity, selectedVarient));
                }
              }}
              className="w-20 bg-red-700 hover:bg-red-900  rounded-lg p-1 text-lg uppercase text-white "
            >
              Cart
            </button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{pizza.name}</Modal.Title>
          </Modal.Header>
          <div className="flex flex-col items-center ">
            <img
              src={pizza.image}
              className="mt-4"
              alt=""
              onClick={handleShow}
            />
            <h4 className="px-6 mt-3"> {pizza.description}</h4>
          </div>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
