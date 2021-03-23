import axios from 'axios';

async function sendLogInData({ email, password }) {
  console.log(email, password);
  const res = await axios.get(`https://jsonplaceholder.typiacode.com/users`);
  return res.data;
}

async function sendSignUpData() {
  return {
    status: 'ok',
  };
}

export { sendLogInData, sendSignUpData };
