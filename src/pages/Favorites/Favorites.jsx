import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useFavorites } from "../../hooks/useFavorites";

import UserList from "../../components/UserList/UserList";
import UserFormModal from "../../components/UserFormModal/UserFormModal";
import UserSearchAndCreate from "../../components/UserSearchAndCreate/UserSearchAndCreate";

import styles from "./Favorites.module.css";

function Favorites() {
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const { favUsers, remove, update, add } = useFavorites();

  const filteredUsers = favUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Favorites</h1>

        <nav className={styles.nav}>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <UserSearchAndCreate
        search={search}
        onSearchChange={setSearch}
        onCreate={() => {
          setSearch("");
          setEditingUser({});
        }}
      />

      <UserList
        users={filteredUsers}
        favUsers={favUsers}
        onDelete={remove}
        onEdit={setEditingUser}
      />

      {editingUser !== null && (
        <UserFormModal
          initialData={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={(user) => {
            if (editingUser?.id) {
              update(user);
            } else {
              add(user);
            }
          }}
        />
      )}
    </div>
  );
}

export default Favorites;
