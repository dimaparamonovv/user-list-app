import React from "react";

import { useForm } from "react-hook-form";
import styles from "./UserFormModal.module.css";

export default function UserFormModal({ onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      age: 18,
    },
  });

  const handleSave = (data) => {
    const user = {
      ...initialData,
      ...data,
      id: initialData?.id || Date.now(),
    };

    onSubmit(user);
    reset();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Edit User" : "Create User"}</h2>

        <form onSubmit={handleSubmit(handleSave)}>
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
          />
          {errors.firstName && <span>First name is required</span>}

          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
          />
          {errors.lastName && <span>Last name is required</span>}

          <input
            type="number"
            {...register("age", { required: true, min: 1 })}
            placeholder="Age"
          />
          {errors.age && <span>Age must be at least 1</span>}

          <div className={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
