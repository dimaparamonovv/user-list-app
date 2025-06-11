import React from "react";
import styles from "./UserCard.module.css";

function UserCard({ user, onAction, actionLabel, disabled, onEdit, onDelete }) {
  const { firstName, lastName, age } = user;

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>
          <strong>Age:</strong> {age}
        </p>
      </div>

      <div className={styles.actions}>
        {onDelete && <button onClick={onDelete}>Delete</button>}
        {onEdit && <button onClick={onEdit}>Edit</button>}
        {onAction && (
          <button onClick={onAction} disabled={disabled}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
