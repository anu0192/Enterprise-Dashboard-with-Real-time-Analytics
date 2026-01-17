import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { setRealTimeData } from '@/features/dashboard/slices/dashboardSlice';
import { addNotification } from '@/features/notifications/slices/notificationSlice';
import WebSocketService from '@/services/websocket/WebSocketService';
import type { WebSocketMessage } from '@/types/api.types';

export const useWebSocket = (url: string) => {
  const dispatch = useAppDispatch();
  const wsService = useRef<WebSocketService | null>(null);

  const handleMessage = useCallback(
    (data: WebSocketMessage) => {
      switch (data.type) {
        case 'dashboard_update':
          dispatch(setRealTimeData(data.payload));
          break;
        case 'notification':
          dispatch(addNotification(data.payload));
          break;
        default:
          console.log('Unknown WebSocket message type:', data.type);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    wsService.current = new WebSocketService(url, handleMessage);
    wsService.current.connect();

    return () => {
      wsService.current?.disconnect();
    };
  }, [url, handleMessage]);

  const send = useCallback((data: unknown) => {
    wsService.current?.send(data);
  }, []);

  const isConnected = useCallback(() => {
    return wsService.current?.isConnected() ?? false;
  }, []);

  return { send, isConnected };
};

