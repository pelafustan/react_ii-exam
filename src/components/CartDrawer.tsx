import { Button, Drawer, Empty, Space, Typography } from "antd";
import { titleCase } from "../utils/titleCase";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../hooks/useCart";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Pizza } from "../utils/types";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";


type DrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CartDrawer({ open, setOpen }: DrawerProps) {
  const navigate = useNavigate();

  const pizzas = useLoaderData() as Pizza[];

  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemQuantity,
    removeFromCart
  } = useCart();

  const cartItems = pizzas.filter(pizza => {
    if (getItemQuantity(pizza.id)) {
      return pizza;
    }
  })

  const handleClose = () => {
    setOpen(false);
  }

  const handleIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    if (id) {
      increaseItemQuantity(id);
    }
  }

  const handleDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    if (id && getItemQuantity(id) >= 1) {
      decreaseItemQuantity(id);
    }
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    if (id) {
      removeFromCart(id);
    }
  }

  const handleCheckout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("cart");
    handleClose();
  }

  return (
    <>
      <Drawer
        title="Tú carro"
        onClose={handleClose}
        open={open}
        width={"35%"}
        extra={
          <Space>
            <Button onClick={handleClose}>Seguir comprando</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Space>
        }
      >
        <Container fluid>
          {
            cartItems.length ?
              <Table responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pizzas.map(pizza => (
                      getItemQuantity(pizza.id)
                        ?
                        <tr key={pizza.id}>
                          <td>{titleCase(pizza.name)}</td>
                          <td>
                            <Button.Group>
                              <Button htmlType="button" data-id={pizza.id} onClick={handleDecrease}>-</Button>
                              <Typography.Text strong className="mx-3">{getItemQuantity(pizza.id)}</Typography.Text>
                              <Button htmlType="button" data-id={pizza.id} onClick={handleIncrease}>+</Button>
                            </Button.Group>
                          </td>
                          <td>
                            <Button htmlType="button" data-id={pizza.id} onClick={handleRemove}>
                              Quitar
                            </Button>
                          </td>
                          <td>{formatCurrency(getItemQuantity(pizza.id) * pizza.price)}</td>
                        </tr>
                        : null
                    ))
                  }
                </tbody>
              </Table>
              :
              <Empty
                description={
                  <span>
                    No tienes productos en tu pedido...
                  </span>
                }
              >

              </Empty>
          }
        </Container>
      </Drawer>
    </>
  )
}
