/* eslint-disable no-undef */
import styled from "styled-components";

const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const;

interface StatusColorProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const HistoryBox = styled.div`
  overflow: auto;
  flex: 1;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${({ theme }) => theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme["gray-100"]};
      font-size: 0.865rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-left: 1.5rem;
      }
    }
    td {
      background-color: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${({ theme }) => theme["gray-800"]};
      padding: 1.5rem;
      line-height: 1.6;
      font-size: 0.875rem;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-left: 1.5rem;
      }
    }
  }
`;

export const Status = styled.span<StatusColorProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme, statusColor }) =>
      theme[STATUS_COLORS[statusColor]]};
  }
`;
