import { useState, useEffect } from "react";
import "./App.css";
import LoginComponent from "./components/login";
import AdminComponent from "./components/admin";

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Check for saved token on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <header className="app-header">
            <h1 className="app-title">Quote Management System</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </header>
          <AdminComponent accessToken={token} />
        </>
      ) : (
        <LoginComponent setToken={setToken} />
      )}
    </div>
  );
}

export default App;
