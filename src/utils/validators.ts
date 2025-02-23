export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,17}$/;

export const validateEmail = (email: string): string => {
  if (!emailPattern.test(email)) {
    return "이메일 형식이 올바르지 않습니다.";
  }
  return "";
};

export const validateUsername = (username: string): string => {
  if (!usernamePattern.test(username)) {
    return "아이디는 5~15자, 영문과 숫자만 가능합니다.";
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!passwordPattern.test(password)) {
    return "비밀번호는 8~17자, 대소문자, 숫자, 특수문자가 포함되어야 합니다.";
  }
  return "";
};

export const validateConfirmPassword = (confirmPassword: string, password: string): string => {
  if (confirmPassword !== password) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};