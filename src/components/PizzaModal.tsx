import { Button, Image, Modal, Typography, Row, Col } from "antd";
import { Pizza } from "../utils/types";
import { titleCase } from "../utils/titleCase";
import { formatCurrency } from "../utils/formatCurrency";


type ModalProps = {
  pizza: Pizza;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PizzaModal({ pizza, open, setOpen }: ModalProps) {
  const handleOk = () => {
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  return (
    <>
      <Modal
        width={"90%"}
        open={open}
        title={titleCase(pizza.name)}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
          >
            Cerrar
          </Button>,
          <Button
            key="cart"
            type="primary"
            onClick={handleCancel}
          >
            Agregar
          </Button>,
        ]}
      >
        <Row justify="space-evenly">
          <Col span={10} key="images">
            <Image.PreviewGroup
              items={[pizza.img, ...pizza.pics]}
            >
              <Image
                src={pizza.img}
              />
            </Image.PreviewGroup>
          </Col>
          <Col span={10} key="description">
            <Typography.Paragraph>{pizza.desc}</Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Ingredientes:</Typography.Text>
              <Typography.Text>
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
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Title
              level={3}
              type="secondary"
              className="d-flex justify-content-end"
            >
              {formatCurrency(pizza.price)}
            </Typography.Title>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
