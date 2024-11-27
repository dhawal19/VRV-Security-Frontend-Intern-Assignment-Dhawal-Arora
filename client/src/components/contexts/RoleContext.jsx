import { useState, useEffect } from "react";
import { RoleContext } from "./ContextFile.js";

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:3000/roles";

  const fetchRoles = async () => {

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        setRoles(data);
        let cols = Object.keys(data[0]);
        cols = cols.filter((column) => column !== "_id");
        cols = cols.filter((column) => column !== "__v");
        cols = cols.map((column) => column.charAt(0).toUpperCase() + column.slice(1));
        cols.push("Actions");
        setColumns(cols);
      } else {
        setRoles([]);
        setColumns(["Name", "Permissions", "Actions"]);
      }
      setIsLoaded(true);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
      setIsLoaded(true);
    }
  }

  const addRole = async (user) => {
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
        throw new Error("Role already exists");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
  const editRole = async (id, updatedRole) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRole),
        });
        if (response.ok) {
          const updatedData = roles.map((role) =>
            role._id === id ? { ...role, ...updatedRole } : role
          );
          setRoles(updatedData);
        } else {
          alert("Error updating role");
        }
    }
    catch (error) {
        alert(error);
    }
  }

  const deleteRole = async (id) => {
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
    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider value={{ roles, columns, isLoaded, error, fetchRoles, addRole, editRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};
