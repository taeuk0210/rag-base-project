import { useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import TextInput from "@/components/login/TextInput";
import authService from "@/services/authService";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  ...theme.typography.body1,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body1,
}));

const LoginContainer: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // validation id and pw

    const res = authService.login({
      loginId: loginId,
      password: password,
    });

    console.log(res);
    setLoginId("");
    setPassword("");
  };

  return (
    <StyledPaper>
      <StyledBox>
        <TextInput label="아이디" value={loginId} setValue={setLoginId} />
        <TextInput label="비밀번호" value={password} setValue={setPassword} />
        <Box>
          <StyledButton onClick={handleLogin}>로그인</StyledButton>
          <StyledButton>회원가입</StyledButton>
        </Box>
      </StyledBox>
    </StyledPaper>
  );
};

export default LoginContainer;
