import axios from "axios";
import React, { useEffect, useState } from "react";
import type { Users } from "../types/user";

type AdminProps = {
  accessToken: string;
};

const AdminComponent: React.FC<AdminProps> = ({ accessToken }) => {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResult = await axios.get("http://localhost:3232/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(usersResult.data);
    };

    fetchData();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  );
};

export default AdminComponent;
