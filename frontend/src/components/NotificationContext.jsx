import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    case 'MARK_AS_READ':
      return state.map(notification =>
        notification.id === action.payload ? { ...notification, read: true } : notification
      );
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  useEffect(() => {
    let isSubscribed = true;

    const handleMessage = (event) => {
      if (!isSubscribed) return;

      try {
        const { type, payload } = event.data;
        if (type === 'NOTIFICATION') {
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              ...payload,
              read: false,
              timestamp: new Date().toISOString(),
            },
          });
        }
      } catch (error) {
        console.error('Error handling notification message:', error);
      }
    };

    // Set up message listener
    if (window.messageChannel) {
      window.messageChannel.port1.onmessage = handleMessage;
    }

    return () => {
      isSubscribed = false;
      if (window.messageChannel) {
        window.messageChannel.port1.onmessage = null;
      }
    };
  }, []);

  const addNotification = (notification) => {
    try {
      if (window.messageChannel) {
        window.messageChannel.port2.postMessage({
          type: 'NOTIFICATION',
          payload: notification,
        });
      } else {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            ...notification,
            read: false,
            timestamp: new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      // Fallback to direct dispatch
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          ...notification,
          read: false,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

  const removeNotification = (id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id,
    });
  };

  const markAsRead = (id) => {
    dispatch({
      type: 'MARK_AS_READ',
      payload: id,
    });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        clearAll,
        unreadCount: notifications.filter(n => !n.read).length,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
