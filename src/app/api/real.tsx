export async function sendEmailReal(email: string) {
  try {
    const response = await fetch('http://localhost:3001/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return { status: 'error', error_message: 'Неверный запрос' };
    }
  } catch (error) {
    return {
      status: 'error',
      error_message: 'Произошла ошибка при отправке электронной почты',
    };
  }
}

export async function getEmailReal() {
  try {
    const response = await fetch('http://localhost:3001/email');
    if (response.ok) {
      return await response.json();
    } else {
      return { status: 'error', error_message: 'Неверный запрос' };
    }
  } catch (error) {
    return { status: 'error', error_message: 'Ошибка получения данных' };
  }
}

export async function signInReal(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = { user: 'user', token: '111111111111' };
      localStorage.setItem('user', JSON.stringify(user));
      return await response.json();
    } else {
      return { status: 'error', error_message: 'Неверные учетные данные' };
    }
  } catch (error) {
    console.log(error);
    return { status: 'error', error_message: 'Ошибка входа' };
  }
}
