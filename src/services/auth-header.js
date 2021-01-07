export default function authHeader() {
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  if (userToken && userToken.token) {
    return { Authorization: 'Bearer ' + userToken.token };
  } else {
    return {};
  }
}