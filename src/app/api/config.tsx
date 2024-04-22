import { getEmailMock, sendEmailMock, signInMock } from './mock';
import { getEmailReal, sendEmailReal, signInReal } from './real';

const isMock = (true);
//const isMock = (false);


export const sendEmail = isMock ? sendEmailMock : sendEmailReal;
export const getEmail = isMock? getEmailMock : getEmailReal;
export const signIn = isMock ? signInMock : signInReal;
