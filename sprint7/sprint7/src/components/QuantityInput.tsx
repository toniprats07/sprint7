import React from 'react';
import styled from 'styled-components';

interface QuantityInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: orange;
  color: white;
  border: 1px solid #ccc;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 0 10px;
  width: 50px;
  text-align: center;
`;

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onIncrement,
  onDecrement,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <Container>
      <Button onClick={onDecrement} disabled={value <= 1}>
        -
      </Button>
      <Input type="text" value={value} onChange={handleInputChange} />
      <Button onClick={onIncrement}>+</Button>
    </Container>
  );
};

export default QuantityInput;
