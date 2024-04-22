export async function sendEmailReal(email: string) {
  try {
    const response = await fetch('/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', error_message: 'Произошла ошибка при отправке электронной почты' };
  }
}

export async function getEmailReal() {
  try {
    const response = await fetch('/email');
    return await response.json();
  } catch (error) {
    return { status: 'error', error_message: 'Ошибка сервера' };
  }
}

export async function signInReal(email: string, password: string) {
  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', error_message: 'Ошибка входа' };
  }
}
