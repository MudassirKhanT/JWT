import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:4000/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setName(res.data.name);
        })
        .catch((err) => {
          console.log("Token invalid or expired");
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <h1>Welcome to Learn MongoDB{name && `, ${name}`}</h1>
    </>
  );
};

export default Dashboard;
