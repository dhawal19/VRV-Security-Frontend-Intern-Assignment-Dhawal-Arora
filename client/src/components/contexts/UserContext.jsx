import { useState, useEffect } from "react";
import { UserContext } from "./ContextFile.js";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:3000/users";

  const fetchUsers = async () => {

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        setUsers(data);
        let cols = Object.keys(data[0]);
        cols = cols.filter((column) => column !== "_id");
        cols = cols.map((column) => column.charAt(0).toUpperCase() + column.slice(1));
        cols.push("Actions");
        setColumns(cols);
      } else {
        setUsers([]);
        setColumns(["Name", "Email", "Status", "Roles", "Actions"]);
      }
      setIsLoaded(true);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
      setIsLoaded(true);
    }
  }

  const addUser = async (user) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 500) {
        throw new Error("Server error");
      } else if (response.status === 400) {
        throw new Error("User already exists");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
  const editUser = async (id, updatedUser) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        if (response.ok) {
          const updatedData = users.map((user) =>
            user._id === id ? { ...user, ...updatedUser } : user
          );
          setUsers(updatedData);
        } else {
          alert("Error updating user");
        }
    }
    catch (error) {
        alert(error);
    }
  }

  const deleteUser = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.message);
        }
        return data;
    }
    catch (error) {
        alert(error);
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, columns, isLoaded, error, fetchUsers, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
