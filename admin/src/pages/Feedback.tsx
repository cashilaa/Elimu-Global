import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card, Row, Col, Statistic } from 'antd';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0 });

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
const response = await axios.get('https://centralize-auth-elimu.onrender.com/admin/feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      message.error('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
const response = await axios.get('https://centralize-auth-elimu.onrender.com/admin/feedback/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      message.error('Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => handleUpdateFeedback(record.id)}>Update</Button>
      ),
    },
  ];

  const handleUpdateFeedback = async (id) => {
    try {
      const token = localStorage.getItem('token');
await axios.patch(`https://centralize-auth-elimu.onrender.com/admin/feedback/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Feedback updated successfully');
      fetchFeedback();
    } catch (error) {
      console.error('Error updating feedback:', error);
      message.error('Failed to update feedback');
    }
  };

  return (
    <div>
      <h1>Feedback</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Feedback" value={stats.total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Feedback" value={stats.pending} />
          </Card>
        </Col>
      </Row>
      <Table columns={columns} dataSource={feedback} loading={loading} rowKey="id" />
    </div>
  );
};

export default Feedback;
