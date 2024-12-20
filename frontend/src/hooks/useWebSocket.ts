import { useEffect } from 'react';
import { websocketService } from '../services/websocket.service';

export const useWebSocket = (event: string, callback: Function) => {
  useEffect(() => {
    websocketService.connect();
    websocketService.subscribe(event, callback);

    return () => {
      websocketService.unsubscribe(event, callback);
    };
  }, [event, callback]);
}; 