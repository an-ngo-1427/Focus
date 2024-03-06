import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";


function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formErr,setFormErr] = useState(false)

  useEffect(()=>{
    let errObj = {}
    if (!email.includes('@')) errObj.email = 'please provide a valid email'
    if (username.length < 5) errObj.username = 'username must be atlest 5 characters'
    if (password.length < 6) errObj.password = 'password must be atleast 6 characters'

    setErrors(errObj)
  },[email,username,password])

  if (sessionUser) return <Navigate to="/" replace={true} />;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length) return setFormErr(true)

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
        "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        navigate("/");
      }
    };


  return (
    <>
      <h1 className = 'user-auth-header'>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <div>

        <form className="user-auth" onSubmit={handleSubmit}>
          <div className="field-labels">
            Email
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formErr && errors.email && <p style={{'color':'red'}}>{errors.email}</p>}
          <label className="field-labels">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {formErr && errors.email && <p style={{'color':'red'}}>{errors.username}</p>}
          <label className="field-labels">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className="field-labels">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className="field-labels" >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {formErr && errors.password && <p style = {{'color':'red'}}>{errors.password}</p>}
          <label className="field-labels">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {formErr && errors.confirmPassword && <p style = {{'color':'red'}}>{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>

    </>
  );
}

export default SignupFormPage;
