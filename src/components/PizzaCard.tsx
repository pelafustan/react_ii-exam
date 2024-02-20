import { Badge, Button, Card, Image, Typography } from "antd";
import { PizzaModal } from "./PizzaModal";
import { Pizza } from "../utils/types";
import { titleCase } from "../utils/titleCase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useCart } from "../hooks/useCart"

export function PizzaCard({ pizza }: { pizza: Pizza }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`/pizzas/${pizza.id}`);
  }

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    increaseItemQuantity(pizza.id);
  }

  const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    removeFromCart(pizza.id);
  }

  const {
    getItemQuantity,
    increaseItemQuantity,
    removeFromCart,
  } = useCart();

  const actions = [
    <Button
      onClick={handleMore}
      key="view"
      type="primary"
    >
      Ver más...
    </Button>,
    <Button
      onClick={handleAdd}
      key="add"
      type="primary"
      style={{ backgroundColor: "green" }}
    >
      Añadir
    </Button>,
  ];

  if (getItemQuantity(pizza.id) > 0 && actions.length === 2) {
    actions.pop();
    actions.push(
      <Button
        onClick={handleRemove}
        key="remove"
        type="primary"
        style={{ backgroundColor: "red" }}
      >
        Quitar
      </Button>
    );
  } else if (!getItemQuantity(pizza.id) && actions.length > 2) {
    actions.pop();
    actions.push(
      <Button
        onClick={handleAdd}
        key="add"
        type="primary"
        style={{ backgroundColor: "green" }}
      >
        Añadir
      </Button>
    )
  }

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        bordered={false}
        title={
          titleCase(pizza.name)
        }
        cover={
          <Badge count={getItemQuantity(pizza.id)}>
            <Image
              onClick={() => setOpen(true)}
              alt={pizza.name}
              src={pizza.img}
              width={"100%"}
              preview={false}
            />
          </Badge>
        }
        actions={actions}
      >
        <Container onClick={() => setOpen(true)}>
          <Typography.Text strong>Ingredientes:</Typography.Text>
          {
            pizza.ingredients.map((ingredient, idx) => (
              <ul
                key={idx}
                style={{
                  listStyle: "none",
                  paddingLeft: "1rem",
                  margin: "0.5rem",
                }}
              >
                <li>
                  <Typography.Text>
                    {titleCase(ingredient)}
                  </Typography.Text>
                </li>
              </ul>
            ))
          }
        </Container>
      </Card >

      <PizzaModal
        pizza={pizza}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
