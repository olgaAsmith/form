'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/Form/Form';
import { useState } from 'react';
import { sendEmail } from '@/app/api/config';

export default function SigninEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const response = await sendEmail(data.email);
    if (response.status === 'success') {
      router.push(`/signin/password`);
      setIsLoading(false);
    } else {
      setErrorMessage(response.error_message || null);
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} name='email'>
      <h1>Введите Email</h1>
      <div className={styles.signin__inputarea}>
        <label className={styles.signin__label} htmlFor='email'>
          Ваш Email
        </label>
        <input
          className={`${styles.signin__input} ${
            errors.email ? styles.signin__input_error : ''
          }`}
          type='email'
          id='email'
          placeholder='example@mail.ru'
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Некорректынй адрес почты',
            },
          })}
        />
        {errors.email && (
          <p className={styles.signin__error}>
            {errors.email.message?.toString()}
          </p>
        )}
        {errorMessage && <p className={styles.signin__error}>{errorMessage}</p>}
      </div>
      <button
        type='submit'
        className={styles.signin__button}
        disabled={isLoading}
      >
        Далее
      </button>
    </Form>
  );
}
