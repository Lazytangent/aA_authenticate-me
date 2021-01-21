import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <li className="navbar__nav-links">
        <li className="navbar__nav-links--navlink">
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li className="navbar__nav-links--navlink">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </li>
    );
  }

  return (
    <nav className="navbar">
      <ul className="navbar__nav-links">
        <li className="navbar__nav-links--navlink">
          <NavLink to="/" exact>Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  )
};

export default Navigation;
