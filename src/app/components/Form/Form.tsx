import styles from './Form.module.css';
import { ReactNode, FC } from 'react';

interface Form {
  name: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

const Form: FC<Form> = (props) => {
  return (
    <form className={styles.form} name={props.name} onSubmit={props.onSubmit} noValidate>
      {props.children}
    </form>
  );
};

export default Form;
