import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoaderData } from "react-router-dom"
import { Pizza } from "../utils/types"
import { PizzaCard } from "../components/PizzaCard";

export function Menu() {
  const pizzas = useLoaderData() as Pizza[];
  return (
    <>
      <Container className="justify-content-center">
        <Row className="justify-content-center">
          {
            pizzas.map(pizza => (
              <Col key={pizza.id} className="mt-3">
                <PizzaCard key={pizza.id} pizza={pizza} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  )
}
