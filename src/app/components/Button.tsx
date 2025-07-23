import styles from './Header.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({ text, onClick, type = "button" }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
