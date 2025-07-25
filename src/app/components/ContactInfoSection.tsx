"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../checkout/page.module.scss";

export default function ContactInfoSection() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Marvin McKinney");
  const [email, setEmail] = useState("example@mail.com");
  const [phone, setPhone] = useState("+66123456789");

  // Завантаження даних з localStorage після монтування
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("contact_name");
      const storedEmail = localStorage.getItem("contact_email");
      const storedPhone = localStorage.getItem("contact_phone");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
    }
  }, []);

  // Збереження в localStorage при зміні станів
  useEffect(() => {
    localStorage.setItem("contact_name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("contact_email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("contact_phone", phone);
  }, [phone]);

  const handleSave = () => setIsEditing(false);

  return (
    <section className={styles.contact_all}>
      <div className={styles.contact}>
        <Image src="/images/Vector.png" alt="" width={9} height={16} />
        <h2 className={styles.contact_title}>Contact information</h2>
      </div>

      <div className={styles.contact_left_all}>
        <div className={styles.contact_left_info}>
          <div className={styles.contact_left_item}>
            <p className={styles.contact_left_item_desc}>Full name</p>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.contact_left_input}
              />
            ) : (
              <p className={styles.contact_left_item_person}>{name}</p>
            )}
          </div>

          <div className={styles.contact_left_item}>
            <p className={styles.contact_left_item_desc}>Email</p>
            {isEditing ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.contact_left_input}
              />
            ) : (
              <p className={styles.contact_left_item_person}>{email}</p>
            )}
          </div>

          <div className={styles.contact_left_item}>
            <p className={styles.contact_left_item_desc}>Phone number</p>
            {isEditing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.contact_left_input}
              />
            ) : (
              <p className={styles.contact_left_item_person}>{phone}</p>
            )}
          </div>
        </div>

        <button
          className={styles.contact_edit}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <span className={styles.buttonText}>
            {isEditing ? "Save" : "Edit"}
          </span>
          <Image src="/images/edit-contained.svg" alt="Edit" width={16} height={16} />
        </button>
      </div>
    </section>
  );
}
