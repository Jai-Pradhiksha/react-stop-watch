import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Card } from 'react-bootstrap';

const StopWatchComponent = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running && time !== 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startStopHandler = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const resetHandler = () => {
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    return `${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow text-center" style={{ width: '350px' }}>
        <Card.Body>
          <Card.Title>
            <h1>Stopwatch</h1>
          </Card.Title>
          <Card.Text className="display-4 mt-4">{formatTime(time)}</Card.Text>
          <div className="mt-4">
            <Button
              variant={running ? 'danger' : 'success'}
              onClick={startStopHandler}
              className="me-2"
            >
              {running ? 'Stop' : 'Start'}
            </Button>
            <Button
              variant="warning"
              onClick={resetHandler}
              disabled={running}
            >
              Reset
            </Button>
          </div>
  
        </Card.Body>
      </Card>
    </Container>
  );
  
};

export default StopWatchComponent;
