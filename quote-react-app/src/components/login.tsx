import axios from "axios";
import React, { useState } from "react";

type LoginProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoginComponent: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3232/auth/login", {
        email,
        password,
      });

      const responseToken = response.data.access_token;
      setToken(responseToken);
      localStorage.setItem("token", responseToken);
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Login failed. Please try again."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p>Email: max2@example.com</p>
          <p>Password: geheimespasswort</p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
