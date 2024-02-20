import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink, useLoaderData } from "react-router-dom";
import { Badge, Button, Typography } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Banner from "../assets/banner.png";
import { useCart } from "../hooks/useCart";
import { Pizza } from "../utils/types";
import { formatCurrency } from "../utils/formatCurrency";

export function Navigation() {
  const navbarStyles: React.CSSProperties = {
    backgroundImage: `url(${Banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "9rem"
  }

  const navStyles: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "700",
  }

  const pizzas = useLoaderData() as Pizza[];

  const { getItemQuantity } = useCart();

  const quantity = pizzas.reduce((acc, curr) => {
    return acc + getItemQuantity(curr.id)
  }, 0)

  const cartPrice = pizzas.reduce((acc, curr) => {
    return acc + (getItemQuantity(curr.id) * curr.price);
  }, 0)

  return (
    <>
      <Navbar style={navbarStyles} className="pb-3 shadow-sm mb-3">
        <Container>
          <Nav className="me-auto" style={navStyles}>
            <NavLink
              to="/"
              className={
                ({ isActive }) => isActive ? "active" : "pending"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pizzas"
              className={
                ({ isActive }) => isActive ? "active" : "pending"
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              className={
                ({ isActive }) => isActive ? "active" : "pending"
              }
            >
              About
            </NavLink>
          </Nav>
          <Badge count={quantity}>
            {
              quantity
                ? 
                  <Typography.Text
                    strong
                    style={{
                      marginRight: "1rem",
                      color: "white",
                    }}
                  >
                    {formatCurrency(cartPrice)}
                  </Typography.Text>
                : null}
            <Button shape="circle" icon={<ShoppingTwoTone />} size="large" />
          </Badge>
        </Container>
      </Navbar>
    </>
  )
}
