"use client";
import React from "react";
import Image from "next/image";
import styles from "../checkout/page.module.scss"; 

interface CommentSectionProps {
  comment: string;
  setComment: (value: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comment, setComment }) => {
  const maxChars = 4000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setComment(e.target.value);
    }
  };

  return (
    <div className={styles.comment_all}>
      <div className={styles.comment}>
         <Image src='/images/Vector.png' alt='' width={9} height={16} />
        <h3 className={styles.comment_title}>Leave a comment</h3>
      </div>
      <textarea
        className={styles.comment_textarea}
        placeholder="Placeholder..."
        maxLength={maxChars}
        value={comment}
        onChange={handleChange}
      />
      <div className={styles.comment_charCount}>
        {comment.length}/{maxChars}
      </div>
    </div>
  );
};

export default CommentSection;
