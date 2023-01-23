import './navig.scss'

function navbar() {
  return(
    <div className="wrapper">
      <ul>
        <li><a href='/auth/login'>Login</a></li>
        <li><a href='/auth/register'>Register</a></li>
      </ul>
    </div>
  );
}

export default navbar;