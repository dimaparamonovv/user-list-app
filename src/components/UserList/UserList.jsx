import React from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.css";

export default function UserList({
  users,
  favUsers,
  onToggleFavorite,
  onDelete,
  onEdit,
}) {
  return (
    <div className={styles.container}>
      {users.map((user) => {
        const isFavorite = favUsers?.some((u) => u.id === user.id);

        return (
          <UserCard
            key={user.id}
            user={user}
            onAction={
              onToggleFavorite ? () => onToggleFavorite(user, isFavorite) : null
            }
            actionLabel={
              onToggleFavorite
                ? isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
                : null
            }
            onDelete={onDelete ? () => onDelete(user.id) : null}
            onEdit={onEdit ? () => onEdit(user) : null}
          />
        );
      })}
    </div>
  );
}
