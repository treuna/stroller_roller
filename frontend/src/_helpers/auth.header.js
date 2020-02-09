export default function authHeader() {
  // returns authorization header with jwt token

const user = JSON.parse(localStorage.getItem('user'))

if (user && user.token) {
  return { 'Authorization': `Bearer ${user.token}`}
}
return {}
}