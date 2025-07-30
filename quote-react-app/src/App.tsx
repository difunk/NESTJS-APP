import { useState } from "react";
import "./App.css";
import LoginComponent from "./components/login";
import AdminComponent from "./components/admin";

function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <>
      <h1>Token: {token}</h1>

      {token ? (
        <AdminComponent accessToken={token} />
      ) : (
        <LoginComponent setToken={setToken} />
      )}
    </>
  );
}

export default App;
