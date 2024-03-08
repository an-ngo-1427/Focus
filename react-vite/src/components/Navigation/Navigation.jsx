import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate()
  return (

      <div className='page-header'>
        <img className='logo' onClick={() => { navigate('/') }} src='https://focus-image.s3.us-west-2.amazonaws.com/focus-logo2.png' />
        <div className = 'header-links'>
          <NavLink to='/'>Tasks</NavLink>
          <NavLink to='/groups'>Group</NavLink>
          <ProfileButton />

        </div>
      </div>




  );
}

export default Navigation;
