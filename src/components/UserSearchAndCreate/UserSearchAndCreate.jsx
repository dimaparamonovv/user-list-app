import React from "react";
import styles from "./UserSearchAndCreate.module.css";

function UserSearchAndCreate({ search, onSearchChange, onCreate }) {
  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button onClick={onCreate}>Create user</button>
    </div>
  );
}

export default UserSearchAndCreate;
