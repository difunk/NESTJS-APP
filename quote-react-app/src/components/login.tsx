import axios from "axios";
import React, { useState } from "react";

type LoginProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoginComponent: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3232/auth/login", {
        email,
        password,
      });

      const responseToken = response.data.access_token;
      setToken(responseToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginComponent;
