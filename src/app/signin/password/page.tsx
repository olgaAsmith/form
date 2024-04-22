'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/Form/Form';
import { getEmail, signIn } from '@/app/api/config';

export default function SigninPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const response = await getEmail();
    const email = response.data;
    const sendResponse = await signIn(email, data.password);
    if (sendResponse.status === 'success') {
      router.push('/');
      setIsLoading(false);
    } else {
      setErrorMessage(sendResponse.error_message || null);
      setIsLoading(false);
    }
  };

  const handlePasswordVisability = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} name='password'>
      <h1>Введите пароль</h1>
      <div className={styles.signin__inputarea}>
        <label className={styles.signin__label} htmlFor='password'>
          Ваш пароль
        </label>
        <input
          className={`${styles.signin__input} ${
            errors.password ? styles.signin__input_error : ''
          }`}
          type={isPasswordVisible ? 'text' : 'password'}
          id='password'
          placeholder={isPasswordVisible ? 'qwerty' : '******'}
          autoComplete='off'
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 6,
              message: 'Минимально - 6 символов',
            },
            pattern: {
              value: /^[A-Za-z\d!@#$%^&*()-_+=<>?]{6,20}$/,
              message: 'Только латинские буквы и символы',
            },
          })}
        />
        {errors.password && (
          <p className={styles.signin__error}>
            {errors.password.message?.toString()}
          </p>
        )}

        {errorMessage && <p className={styles.signin__error}>{errorMessage}</p>}
        <div
          className={`${styles.signin__hider} ${
            isPasswordVisible
              ? styles.signin__hider_open
              : styles.signin__hider_close
          }`}
          onClick={handlePasswordVisability}
        ></div>
      </div>

      <button
        type='submit'
        className={styles.signin__button}
        disabled={isLoading}
      >
        Войти
      </button>
    </Form>
  );
}
