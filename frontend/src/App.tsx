import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  age: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    loadUsers();
  }, []);

  const validateUser = (): string => {
    if (!name) {
      return "Name is required";
    }
    const ageNumber = Number(age);
    if (!age || isNaN(ageNumber) || ageNumber <= 0) {
      return "Please enter a valid positive age";
    }
    return ""; // no error
  };

  const loadUsers = async () => {
    const res = await fetch("http://localhost:8080/api/users");
    const data: User[] = await res.json();
    setUsers(data);
  };

  const createUser = async () => {
    const errorMsg = validateUser();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError("");

    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
      }),
    });

    clearForm();
    loadUsers();
  };

  const updateUser = async () => {
    const errorMsg = validateUser();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError("");
    await fetch(`http://localhost:8080/api/users/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
      }),
    });

    clearForm();
    loadUsers();
  };

  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    });

    loadUsers();
  };

  const editUser = (user: User) => {
    setName(user.name);
    setAge(String(user.age));
    setEditingId(user.id);
  };

  const clearForm = () => {
    setName("");
    setAge("");
    setEditingId(null);
  };

/**
 * onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
 * React.ChangeEvent<HTMLInputElement> is type of e.
 * (1) ChangeEvent This is a type provided by React for events like:onChange,onInput.It represents the event object (e).
 * (2) <HTMLInputElement> is a generic type parameter.It tells TypeScript: “This event comes from an <input> element”
 * So now TS knows: e.target.value   // ✅ string
 */
  return (
    <div style={{ padding: "40px" }}>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      <h2>{editingId ? "Update User" : "Create User"}</h2>

      <input
        placeholder="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          setName(e.target.value);
          setError("");
        }}
      />

      <input
        placeholder="age"
        value={age}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setAge(e.target.value);
          setError("");
        }}
      />

      {editingId ? (
        <button onClick={updateUser}>Update</button>
      ) : (
        <button onClick={createUser}>Create</button>
      )}

      <h2>User List</h2>

      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.age}

          <button onClick={() => editUser(u)}>Edit</button>

          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;