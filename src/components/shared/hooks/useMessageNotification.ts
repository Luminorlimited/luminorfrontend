import { useGetMessageNotificationQuery } from '@/redux/Api/messageApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useMessageNotification = () => {
  const [count, setCount] = useState(0);
  const userId = useSelector((state: RootState) => state.Auth.user?.id);

  // Pass userId directly, not as an object
  const { data: apiData, refetch } = useGetMessageNotificationQuery(userId, {
    skip: !userId, // Skip query if userId is not available
  });

  useEffect(() => {
    if (apiData?.count !== undefined) {
      setCount(apiData.count);
    }

    if (!userId) return;

    const eventSourceUrl = `https://api.luminor-ltd.com/api/v1/notification/message-count/${userId}`;
    console.log("eventSourceUrl", eventSourceUrl);
    console.log("userId", userId);

    const eventSource = new EventSource(eventSourceUrl, {
      withCredentials: true,
    });

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
      setTimeout(() => {
        refetch();
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [apiData, refetch, userId]);

  return { count };
};
