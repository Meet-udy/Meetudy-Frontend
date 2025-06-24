import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CommentNotificationListener: React.FC = () => {
  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.warn("사용자 토큰이 필요합니다.");
      return;
    }

    const eventSource = new EventSource(`http://localhost:8080/meetudy/notifications/subscribe?token=${accessToken}`);

    eventSource.onopen = () => {
      console.log("SSE 연결에 성공했습니다.");
    };

    eventSource.addEventListener("comment", (event: MessageEvent) => {
      console.log("comment 이벤트를 수신했습니다.:", event.data);
      try {
        const notification = JSON.parse(event.data);
        toast(`💬 새 댓글: ${notification.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            background: "#99999922",
            color: "#555", 
          },
        });
      } catch (parseError) {
        console.error("comment 이벤트 데이터 파싱 오류가 발생했습니다.:", parseError, event.data);
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE 연결 중 오류가 발생했습니다.:", err);
      if (eventSource.readyState === EventSource.CLOSED) {
        console.warn("EventSource가 닫혔습니다.");
        eventSource.close();
      }
    };

    return () => {
      console.log("SSE 연결을 해제합니다.");
      eventSource.close();
    };
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default CommentNotificationListener;