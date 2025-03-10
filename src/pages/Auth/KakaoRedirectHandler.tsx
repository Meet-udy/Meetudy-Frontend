import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/auth.ts";

const OAuth2RedirectHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      kakaoLogin(code)
        .then((response) => {
          if (response.isSuccess && response.result) {
            localStorage.setItem("accessToken", response.result.jwtTokenDto.accessToken);
            localStorage.setItem("refreshToken", response.result.jwtTokenDto.refreshToken);
            
            if (response.result.isFirstLogin) {
              navigate("/additional-info");
            } else {
              navigate("/");
            }
          } else {
            alert("카카오 로그인에 실패했습니다.");
            navigate("/login");
          }
        })
        .catch(() => {
          alert("카카오 로그인 중 오류가 발생했습니다.");
          navigate("/login");
        });
    }
  }, [searchParams, navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default OAuth2RedirectHandler;