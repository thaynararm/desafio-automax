import styled from "styled-components";

interface DropdownContentProps {
  open: boolean;
}

export const Container = styled.div`
  min-height: 100vh;
  padding: 0px;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

export const Header = styled.header`
  margin-bottom: 0px;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 40px;
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding: 20px;
    text-shadow: 2px 2px 20px #3a3a3aff;
  }
`;

export const Main = styled.main`
  display: flex;
`;

export const Footer = styled.footer`
  margin-top: 40px;
  text-align: center;
  font-size: 0.9em;
  color: #666;
  border: 2px solid #ccc;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
`;

export const DivCarts = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

export const Dropdown = styled.div`
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

export const DropdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
  cursor: pointer;
  background-color: #f7f7f7;
  font-weight: bold;
  justify-content: space-between;
`;

export const DropdownContent = styled.div<DropdownContentProps>`
  padding: 10px;
  display: ${(props) => (props.open ? "block" : "none")};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;
