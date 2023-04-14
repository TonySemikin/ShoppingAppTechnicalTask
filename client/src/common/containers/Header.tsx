import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Avatar, Badge, Layout, theme, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../logo.png';
import { useModals } from '../contexts/ModalContext';
import { useSession } from '../contexts/SessionContext';
import { useShoppingCart } from '../../views/cart/contexts/ShoppingCartContext';
import CartIcon from '../../views/cart/components/CartIcon';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  //*** HOOKS ***//

  const navigate = useNavigate();

  //*** CONTEXTS ***//

  const { cart } = useShoppingCart();
  const { user } = useSession();
  const { setModals } = useModals();

  //*** HANDLERS ***//

  const handleCartIconClick = () => {
    setModals({ isCartModalOpen: true });
  };

  const handleHomeClick = () => {
    navigate('/shop');
  };

  //*** CONFIG ***//

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <AntHeader
        style={{
          padding: 5,
          background: colorBgContainer,
        }}>
        <Row>
          <Col span={18}>
            <Space align="center" onClick={handleHomeClick}>
              <img
                src={logo}
                alt="Tony & Jacando Icon"
                style={{ marginRight: 5, width: 50 }}
              />
              <span>Tony & Jacando</span>
            </Space>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Space align="center">
              {user && (
                <>
                  <span style={{ marginRight: 20 }}>{user.username}</span>
                  <Badge count={cart?.items.length ?? null}>
                    <Avatar
                      alt="User Icon"
                      style={{ marginRight: 20, backgroundColor: '#87d068' }}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                </>
              )}
              <CartIcon handleClick={handleCartIconClick} />
            </Space>
          </Col>
        </Row>
      </AntHeader>
    </Layout>
  );
};

export default Header;
