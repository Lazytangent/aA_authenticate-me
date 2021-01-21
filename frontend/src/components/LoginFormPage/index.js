import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';
import { login } from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      credential,
      password,
    };
    const res = await dispatch(login(user));
    console.log(res);
    if (res.data && res.data.errors) setErrors(res.data.errors);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <ul className="errors-list">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="form__input-group">
        Username or Email
        <input required className="form__input-group--input-field" type="text" value={credential} onChange={e => setCredential(e.target.value)} />
      </label>
      <label className="form__input-group">
        Password
        <input required className="form__input-group--input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginFormPage;
