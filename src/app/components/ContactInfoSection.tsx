"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../checkout/page.module.scss';

export default function ContactInfoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Marvin McKinney');
  const [email, setEmail] = useState('example@mail.com');
  const [phone, setPhone] = useState('+66123456789');

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
          {isEditing ? 'Save' : 'Edit'}
          <Image src="/images/edit-contained.svg" alt="Edit" width={16} height={16} />
        </button>
      </div>
    </section>
  );
}
