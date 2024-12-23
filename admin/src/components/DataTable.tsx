import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 16px;
    overflow: hidden;
    
    @media (max-width: 768px) {
      border-radius: 8px;
    }
    
    .ant-table-thead > tr > th {
      background: ${props => props.theme.colors.lightBlue};
      color: ${props => props.theme.colors.primaryBlue};
      font-family: 'Comic Sans MS', cursive;
      padding: 16px;
      
      @media (max-width: 768px) {
        padding: 12px;
        font-size: 14px;
      }
      
      @media (max-width: 576px) {
        padding: 8px;
        font-size: 13px;
      }
      
      &::before {
        display: none;
      }
    }
    
    .ant-table-tbody > tr {
      &:hover {
        td {
          background: ${props => props.theme.colors.softGray};
        }
      }
      
      td {
        padding: 16px;
        border-bottom: 1px dashed ${props => props.theme.colors.lightBlue};
        
        @media (max-width: 768px) {
          padding: 12px;
          font-size: 14px;
        }
        
        @media (max-width: 576px) {
          padding: 8px;
          font-size: 13px;
        }
      }
    }
  }

  .ant-table-pagination {
    margin: 16px !important;
    
    @media (max-width: 768px) {
      margin: 12px !important;
      flex-wrap: wrap;
      row-gap: 8px;
    }

    @media (max-width: 576px) {
      margin: 8px !important;
      
      .ant-pagination-options {
        display: none;
      }
    }
  }
`;

export const DataTable = (props: any) => {
  return (
    <StyledTable 
      {...props} 
      scroll={{ x: 'max-content' }}
      pagination={{
        ...props.pagination,
        size: window.innerWidth <= 576 ? 'small' : 'default',
      }}
    />
  );
}; 