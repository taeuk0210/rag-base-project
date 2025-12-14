import LoginContainer from "@/components/login/LoginContainer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifySelf: "center",
  gap: theme.spacing(1),
}));

const LoginPage: React.FC = () => {
  return (
    <>
      <StyledBox>
        <LoginContainer />
      </StyledBox>
    </>
  );
};

export default LoginPage;
