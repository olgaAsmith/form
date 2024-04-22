export async function sendEmailMock(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!email) {
    return { status: 'error', error_message: 'invalid' };
  } else {
    return { status: 'success', data: email };
  }
}

export async function getEmailMock() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { status: 'success', data: 'test@test.test' };
}

export async function signInMock(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!email || !password) {
    return { status: 'error', error_message: 'invalid' };
  } else {
    const user = { user: 'user', token: '111111111111' };
    localStorage.setItem('user', JSON.stringify(user));
    return { status: 'success' };
  }
}
