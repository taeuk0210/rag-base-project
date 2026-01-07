import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
// import ProtectedRoute from "@/routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          //   <MainPage />
          // </ProtectedRoute>
          <MainPage />
        }
      />
    </Routes>
  );
};

export default App;
