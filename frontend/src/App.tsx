import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import DocsPage from "@/pages/DocPage";
import ProfilePage from "@/pages/ProfilePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;