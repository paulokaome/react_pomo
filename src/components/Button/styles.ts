import styled from "styled-components";

export type ButtonVariantColor = "primary" | "secondary" | "danger" | "success";

interface VariantButtonProps {
  variant: ButtonVariantColor;
}

// const buttonVariant = {
//   primary: "purple",
//   secondary: "orange",
//   danger: "red",
//   success: "green",
// };

export const ButtonContainer = styled.button<VariantButtonProps>`
  height: 40px;
  width: 100px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${({ theme }) => theme["green-500"]};
  color: ${({ theme }) => theme.white};
`;
