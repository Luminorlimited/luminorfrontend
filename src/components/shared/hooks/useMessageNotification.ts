import { useGetMessageNotificationQuery } from '@/redux/Api/messageApi';
import { useEffect, useState } from 'react';

export const useMessageNotification = () => {
  const [count, setCount] = useState(0);
  const { data: apiData, refetch } = useGetMessageNotificationQuery({});
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    // Initial count from API
    if (apiData) {
      setCount(apiData.count);
    }

    // SSE connection
    const eventSourceUrl = `https://api.luminor-ltd.com/api/v1/notification/message-count${token ? `?token=${encodeURIComponent(token)}` : ''}`;
    
    const eventSource = new EventSource(eventSourceUrl, { withCredentials: true });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data['message-count']) {
          setCount(data['message-count'].count);
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
      // Attempt to reconnect after a delay
      setTimeout(() => {
        refetch(); // Fallback to API call if SSE fails
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [apiData, refetch, token]);

  return { count };
};
