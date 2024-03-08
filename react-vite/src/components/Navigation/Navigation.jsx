import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const logoPath = '/public/focus-logo2.png'
  const navigate = useNavigate()
  return (

      <div className='page-header'>
        <img className='logo' onClick={() => { navigate('/') }} src={logoPath} />
        <div className = 'header-links'>
          <NavLink to='/'>Tasks</NavLink>
          <NavLink to='/groups'>Group</NavLink>
          <ProfileButton />

        </div>
      </div>




  );
}

export default Navigation;
