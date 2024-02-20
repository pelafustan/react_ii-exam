import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Typography } from "antd";

export function ErrorElement() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown === 1) {
        clearInterval(intervalId);
        navigate("/");
      }
      setCountdown(countdown - 1);
    }, 1000)

    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <>
      <Container fluid className="p-5">
        <Typography.Title className="mt-4">Oops! Algo salió mal 🚨</Typography.Title>
        <Typography.Title level={3} className="mt-4">Serás redireccionado a la ventana principal en {countdown} segundos...</Typography.Title>
      </Container>
    </>
  )
}

