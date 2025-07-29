import { useState } from "react";
import "./App.css";
import LoginComponent from "./components/login";
import QuotesComponent from "./components/quotes";
import AdminComponent from "./components/admin";

function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <>
      <h1>Token: {token}</h1>
      {/* <QuotesComponent /> */}
      {token ? (
        <AdminComponent accessToken={token} />
      ) : (
        <LoginComponent setToken={setToken} />
      )}
    </>
  );
}

export default App;
