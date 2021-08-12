import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const { handleLogIn } = props;
  const history = useHistory();
  return (
    <div>
      <h1>This is the login</h1>
      <button type="button" onClick={() => { handleLogIn(); history.push('/'); }}>LogIn</button>
    </div>
  );
}

Login.propTypes = {
  handleLogIn: PropTypes.func,
};

Login.defaultProps = {
  handleLogIn: null,
};
export default Login;
