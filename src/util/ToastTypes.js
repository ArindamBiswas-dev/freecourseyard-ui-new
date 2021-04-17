const toastTypeSuccessOnSignUP = {
  title: 'Account created.',
  description: 'Check your email to verify your account',
  status: 'success',
  duration: 6000,
  isClosable: true,
  position: 'bottom-right',
};
const toastTypeErrorOnSignUP = {
  title: 'User Exists.',
  description: 'User already exists, Please LogIn',
  status: 'error',
  duration: 6000,
  isClosable: true,
  position: 'bottom-right',
};
const toastTypeSuccessOnLogIn = {
  title: 'Logged In',
  description: 'Logged In successfully',
  status: 'success',
  duration: 6000,
  isClosable: true,
  position: 'bottom-right',
};
const toastTypeErrorOnLogIn = {
  title: 'User does not Exists.',
  description: 'User does not Exists, pleases create account',
  status: 'error',
  duration: 6000,
  isClosable: true,
  position: 'bottom-right',
};

export {
  toastTypeSuccessOnSignUP,
  toastTypeErrorOnSignUP,
  toastTypeSuccessOnLogIn,
  toastTypeErrorOnLogIn,
};
