import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingContext from "../../context/ShoppingContext";

const ShoppingCart = (props) => {
  const shoppingCtx = useContext(ShoppingContext);
  const { cartItems } = shoppingCtx;
  const cartArray = cartItems.items; //getting item array from cart

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography
        sx={{ fontWeight: "bold", color: "grey", textAlign: "center" }}
      >
        Your Swag
      </Typography>
      <>
        {cartArray.map((item, index) => (
          <>
            <img src={item.product.image[0]} alt={item.name} width={"160px"} />
            <Typography sx={{ color: "grey", textAlign: "center" }}>
              {item.product.name}
            </Typography>
            <Typography sx={{ color: "grey", textAlign: "center" }}>
              ${item.product.price}
            </Typography>
            <Button onClick={() => removeFromCart(index)}>
              Remove From Cart
            </Button>
            <Typography>Item Total: </Typography>
          </>
        ))}
      </>
      <div style={{ textAlign: "center" }}>Total Order Cost:</div>
      <Button variant="contained">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography sx={{ color: "gray" }}>browse more</Typography>
        </Link>
      </Button>

      <Button variant="contained">
        <Link to="checkout" style={{ textDecoration: "none" }}>
          <Typography sx={{ color: "gray" }}>Check out</Typography>
        </Link>
      </Button>
      <Button variant="contained" onClick={() => console.log(cartItems)}>
        Click Me
      </Button>
    </div>
  );
};

export default ShoppingCart;
