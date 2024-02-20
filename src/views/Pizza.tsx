import { Avatar, Badge, Button, Col, Divider, Image, List, Row, Typography } from "antd";
import Container from "react-bootstrap/Container";
import { useLoaderData } from "react-router-dom";

import { Pizza } from "../utils/types";
import { titleCase } from "../utils/titleCase";

import SliceSVG from "../assets/pizza_slice.svg";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../hooks/useCart";

export function PizzaView() {
  const pizza = useLoaderData() as Pizza;

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart
  } = useCart();

  const quantity = getItemQuantity(pizza.id);
  const subTotal = quantity * pizza.price;

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    increaseItemQuantity(pizza.id);
  }

  const handleDecrease = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    decreaseItemQuantity(pizza.id);
  }

  const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    removeFromCart(pizza.id);
  }

  return (
    <>
      <Container fluid className="p-3">
        <Typography.Title>
          {titleCase(pizza.name)}
        </Typography.Title>
        <Row justify="space-evenly">
          <Col span={10} key="image">
            <Image.PreviewGroup
              items={[pizza.img, ...pizza.pics]}
            >
              <Image
                src={pizza.img}
              />
            </Image.PreviewGroup>
          </Col>
          <Col span={12} key="info">
            <Typography.Paragraph>{pizza.desc}</Typography.Paragraph>
            <Divider orientation="left">Ingredientes</Divider>
            <List
              itemLayout="horizontal"
              dataSource={pizza.ingredients}
              renderItem={(item, idx) => (
                <List.Item key={idx} style={{ border: "none" }}>
                  <List.Item.Meta
                    avatar={<Avatar src={SliceSVG} alt="slice" />}
                    title={titleCase(item)}
                  />
                </List.Item>
              )}
            />
            <Divider />
          </Col>
        </Row>
        <Row justify="space-evenly" className="mt-3">
          <Col key="price">
            <Typography.Title level={3} className="text-muted">
              Precio: {formatCurrency(pizza.price)} / un.
            </Typography.Title>
          </Col>
          {
            subTotal
            ? 
              <Col key="sub">
                <Typography.Title level={3} className="text-muted">
                  Sub Total: {formatCurrency(subTotal)}
                </Typography.Title>
              </Col>
            : null
          }
          <Col key="buttons">
            <Container className="d-flex flex-row">
              <Badge count={quantity}>
                <Button
                  onClick={handleAdd}
                  key="add"
                  type="primary"
                  style={{ backgroundColor: "green" }}
                >
                  Añadir
                </Button>
              </Badge>
              {
                quantity
                  ?
                    <Button
                      onClick={handleDecrease}
                      key="remove"
                      type="primary"
                      style={{
                        marginLeft: "1rem",
                        backgroundColor: "red",
                      }}
                    >
                      Quitar
                    </Button>
                  : null
              }
              {
                quantity > 1
                  ?
                    <Button
                      onClick={handleRemove}
                      key="removeAll"
                      type="primary"
                      style={{
                        marginLeft: "1rem",
                        backgroundColor: "darkred",
                      }}
                    >
                      Quitar todo
                    </Button>
                  : null
              }
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
