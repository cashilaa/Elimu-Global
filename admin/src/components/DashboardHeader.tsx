import React from 'react';
import styled from 'styled-components';
import { Select, DatePicker, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const HeaderWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .filters {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .refresh-button {
    &:hover {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
  }
`;

interface DashboardHeaderProps {
  onDateRangeChange: (dates: any) => void;
  onViewChange: (view: string) => void;
  onRefresh: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onDateRangeChange,
  onViewChange,
  onRefresh
}) => (
  <HeaderWrapper>
    <div className="filters">
      <RangePicker onChange={onDateRangeChange} />
      <Select
        defaultValue="week"
        style={{ width: 120 }}
        onChange={onViewChange}
        options={[
          { value: 'day', label: 'Daily' },
          { value: 'week', label: 'Weekly' },
          { value: 'month', label: 'Monthly' }
        ]}
      />
    </div>
    <Button 
      type="primary"
      icon={<ReloadOutlined />}
      onClick={onRefresh}
      className="refresh-button"
    >
      Refresh
    </Button>
  </HeaderWrapper>
); 