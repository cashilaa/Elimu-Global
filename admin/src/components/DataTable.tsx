import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 16px;
    overflow: hidden;
    
    .ant-table-thead > tr > th {
      background: ${props => props.theme.colors.lightBlue};
      color: ${props => props.theme.colors.primaryBlue};
      font-family: 'Comic Sans MS', cursive;
      
      &::before {
        display: none; // Remove default border
      }
    }
    
    .ant-table-tbody > tr {
      &:hover {
        td {
          background: ${props => props.theme.colors.softGray};
        }
      }
      
      td {
        border-bottom: 1px dashed ${props => props.theme.colors.lightBlue};
      }
    }
  }
`;

export const DataTable = (props: any) => {
  return <StyledTable {...props} />;
}; 