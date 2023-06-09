import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../modules/AuthorizationModule/store/reducer';

const storageName = 'userData_gradebook';

export function useAuth() {
  const [ready, setReady] = useState(false);
  const { isAuthorization, name, email, role, name_subject, token } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const login = useCallback((token, name, email, role, name_subject) => {
    dispatch(loginAction({ token, name, email, role, name_subject }));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  useEffect(() => {
    if (token) {
      setReady(true);
      return;
    }

    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.name, data.email, data.role, data.name_subject);
    }

    setReady(true);
  }, [login]);

  return { login, logout, isAuthorization, name, email, role, name_subject, token, ready };
}
