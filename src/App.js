import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Table } from "react-bootstrap";

const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function App() {
  const [targetHours, setTargetHours] = useState(50);
  const [weekHours, setWeekHours] = useState(Array(7).fill(0));

  // Carrega o estado salvo no localStorage ao iniciar
  useEffect(() => {
    const savedWeekHours = JSON.parse(localStorage.getItem("weekHours"));
    if (savedWeekHours) {
      setWeekHours(savedWeekHours);
    }
  }, []);

  // Salva o estado no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem("weekHours", JSON.stringify(weekHours));
  }, [weekHours]);

  const handleHourChange = (day, hours) => {
    const newWeekHours = [...weekHours];
    newWeekHours[day] = hours;
    setWeekHours(newWeekHours);
  };

  const calculateTotalHours = () => {
    return weekHours.reduce((total, hours) => total + hours, 0) * 4; // Multiplicando por 4 para considerar quatro semanas
  };

  const hoursLeft = targetHours - calculateTotalHours();
  const extraHours = calculateTotalHours() - targetHours;

  return (
    <Container style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
      <h1 className="mt-5" style={{ color: "#6a5acd" }}>Programador de Horas</h1>
      <Form className="mt-3">
        <Form.Group controlId="targetHours">
          <Form.Label style={{ color: "#6a5acd" }}>Escolha o alvo de horas para o mês:</Form.Label>
          <Form.Control
            as="select"
            value={targetHours}
            onChange={(e) => setTargetHours(parseInt(e.target.value))}
          >
            <option value={15}>15 horas</option>
            <option value={30}>30 horas</option>
            <option value={50}>50 horas</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Table bordered responsive className="mt-3" style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#6a5acd", color: "#fff", borderTopLeftRadius: "10px" }}>Dia</th>
            <th style={{ backgroundColor: "#6a5acd", color: "#fff", borderTopRightRadius: "10px" }}>Horas</th>
          </tr>
        </thead>
        <tbody>
          {weekHours.map((hours, index) => (
            <tr key={index}>
              <td>{weekdays[index]}</td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => handleHourChange(index, parseInt(e.target.value))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mt-3">
        <Col>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6a5acd" }}>Total de horas por semana: {calculateTotalHours() / 4}</p>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6a5acd" }}>Total de horas no mês: {calculateTotalHours()}</p>
          {extraHours > 0 && <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6a5acd" }}>Você atingirá o alvo com {extraHours} horas de sobra.</p>}
          {hoursLeft > 0 && <p style={{ fontSize: "18px", fontWeight: "bold", color: "#6a5acd" }}>Faltam {hoursLeft} horas para atingir o alvo.</p>}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
