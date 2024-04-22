'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoading(false);
    } else {
      router.push('/signin/email');
    }
  }, [router]);

  const handleClick = () => {
    localStorage.removeItem('user');
    router.push('/signin/email');
  };

  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <>
          <main className={styles.main}>
            <h1>MAIN PAGE</h1>
            <button
              type='button'
              className={styles.button}
              onClick={handleClick}
            >
              Выход
            </button>
          </main>
        </>
      )}
    </>
  );
}
