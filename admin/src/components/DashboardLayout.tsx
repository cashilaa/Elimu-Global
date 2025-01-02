import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { 
  DashboardOutlined, 
  BookOutlined, 
  UserOutlined, 
  DollarOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  WalletOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;

  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.primaryBlue};
    
    img {
      height: 40px;
    }
  }

  .ant-layout-sider {
    background: white;
    box-shadow: 2px 0 8px rgba(0,0,0,0.05);

    @media (max-width: 768px) {
      display: none;
    }

    .ant-menu {
      border-right: none;

      .ant-menu-item {
        margin: 8px 16px;
        width: calc(100% - 32px);
        border-radius: 8px;

        &:hover {
          background: ${props => props.theme.colors.lightBlue};
        }

        &.ant-menu-item-selected {
          background: ${props => props.theme.colors.primaryBlue};
          color: white;
        }
      }
    }
  }

  .site-header {
    background: white;
    padding: 0 24px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);

    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: ${props => props.theme.colors.primaryBlue};
      }

      @media (min-width: 769px) {
        display: none;
      }
    }
  }

  .site-content {
    margin: 24px;
    padding: 24px;
    background: white;
    border-radius: 16px;

    @media (max-width: 768px) {
      margin: 16px;
      padding: 16px;
      border-radius: 8px;
    }
  }
`;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }

  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.primaryBlue};
    
    img {
      height: 40px;
    }
  }

  .ant-menu {
    border-right: none;

    .ant-menu-item {
      margin: 8px 16px;
      width: calc(100% - 32px);
      border-radius: 8px;

      &:hover {
        background: ${props => props.theme.colors.lightBlue};
      }

      &.ant-menu-item-selected {
        background: ${props => props.theme.colors.primaryBlue};
        color: white;
      }
    }
  }
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: 'Courses',
    },
    {
      key: '/instructors',
      icon: <TeamOutlined />,
      label: 'Instructors',
    },
    {
      key: '/students',
      icon: <UserOutlined />,
      label: 'Students',
    },
    {
      key: '/revenue',
      icon: <DollarOutlined />,
      label: 'Revenue',
    },
    {
      key: '/payments',
      icon: <WalletOutlined />,
      label: 'Payments',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setMobileDrawerVisible(false);
  };

  return (
    <StyledLayout>
      {/* Desktop Sidebar */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={260}
      >
        <div className="logo">
          <img src="/assets/illustrations/logo.svg" alt="Elimu Logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* Mobile Drawer */}
      <MobileDrawer
        placement="left"
        open={mobileDrawerVisible}
        onClose={() => setMobileDrawerVisible(false)}
        width={280}
      >
        <div className="logo">
          <img src="/assets/illustrations/logo.svg" alt="Elimu Logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </MobileDrawer>

      <Layout>
        <Header className="site-header">
          <Button
            type="text"
            icon={mobileDrawerVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setMobileDrawerVisible(!mobileDrawerVisible)}
            className="trigger"
          />
        </Header>
        <Content className="site-content">
          {children}
        </Content>
      </Layout>
    </StyledLayout>
  );
}; 