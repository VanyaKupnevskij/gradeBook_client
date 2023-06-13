import panelGlobalStyle from '../../../../components/panelGlobalStyle.module.scss';
import styles from './style.module.scss';

import Button from '../../../../ui/Button';
import TextInput from '../../../../ui/TextInput';
import SelectInput from '../../../../ui/SelectInput';
import { useHttp } from '../../../../hooks/http.hook';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/auth.hook';

function AuthorizationModule() {
  const classNameRoot = `${panelGlobalStyle.panel} ${styles.root} `;
  const { login, isAuthorization, name, email, token, role, name_subject } = useAuth();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    name_subject: '',
  });
  const [isLogin, setIsLogin] = useState(true);

  const listRoles = [
    { key: 'student', value: 'Студент' },
    { key: 'teacher', value: 'Викладач' },
    { key: 'admin', value: 'Адмін' },
  ];

  async function handleClickSubmit() {
    try {
      if (isLogin) {
        const { token, name, email, role, name_subject } = await request({
          url: '/auth/login',
          method: 'post',
          data: { email: form.email, password: form.password },
        });

        login(token, name, email, role, name_subject);
      } else {
        const responce = await request({
          url: '/auth/registration',
          method: 'post',
          data: {
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
            name_subject: form.name_subject,
          },
          bearerToken: token,
        });

        setIsLogin(true);
      }

      setForm({ email: '', password: '', name: '', role: 'student', name_subject: '' });
    } catch (e) {}
  }

  function handleChange(name, newValue) {
    clearError();

    setForm({ ...form, [name]: newValue });

    console.log({ ...form, [name]: newValue });
  }

  function handleChangeType() {
    setIsLogin((prev) => !prev);
    setForm({ email: '', password: '', name: '', role: 'student', name_subject: '' });
  }

  return (
    <>
      {isAuthorization && (
        <div className={classNameRoot}>
          <h6 className={styles.title}>Дані користувача</h6>
          <dl className={styles.list_info}>
            <div className={styles.row}>
              <dt>Ім'я</dt>
              <dd>{name}</dd>
            </div>
            <div className={styles.row}>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
            <div className={styles.row}>
              <dt>Роль</dt>
              <dd>{{ teacher: 'Викладач', student: 'Студент', admin: 'Адміністратор' }[role]}</dd>
            </div>
            {role === 'teacher' && (
              <div className={styles.row}>
                <dt>Назва предмету</dt>
                <dd>{name_subject}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
      <div className={classNameRoot}>
        <h6 className={styles.title}>{isLogin ? 'Вхід' : 'Реєстрація'}</h6>
        {error && <p className={styles.error_message}>{error.message}</p>}
        {!isLogin && (
          <TextInput
            name={'name'}
            placeholder={"Уведіть ім'я..."}
            label={"Ім'я"}
            value={form.name}
            onChange={(value) => handleChange('name', value)}
            onKeyUp={(e) => e.key === 'Enter' && handleClickSubmit()}
          />
        )}
        <TextInput
          name={'email'}
          placeholder={'Уведіть електронну пошту...'}
          label={'Email'}
          value={form.email}
          onChange={(value) => handleChange('email', value)}
          onKeyUp={(e) => e.key === 'Enter' && handleClickSubmit()}
        />
        <TextInput
          name={'password'}
          type="password"
          placeholder={'Уведіть пароль...'}
          label={'Пароль'}
          value={form.password}
          onChange={(value) => handleChange('password', value)}
          onKeyUp={(e) => e.key === 'Enter' && handleClickSubmit()}
        />
        {!isLogin && (
          <>
            <SelectInput
              className={styles.select_role}
              name={'role'}
              placeholder={'Уведіть вашу роль...'}
              label={'Роль'}
              options={listRoles}
              value={form.role}
              onChange={(value) => handleChange('role', value)}
              onKeyUp={(e) => e.key === 'Enter' && handleClickSubmit()}
            />
            <TextInput
              name={'name_subject'}
              placeholder={'Уведіть назву предмету...'}
              label={'Назва предмету'}
              value={form.name_subject}
              onChange={(value) => handleChange('name_subject', value)}
              onKeyUp={(e) => e.key === 'Enter' && handleClickSubmit()}
            />
          </>
        )}
        {role === 'admin' ? (
          <>
            <Button className={styles.submit_button} onClick={handleClickSubmit} disabled={loading}>
              {loading ? 'Завантажуємо...' : isLogin ? 'Увійти' : 'Зареєструватися'}
            </Button>
            <p className={styles.another_link} onClick={handleChangeType}>
              {isLogin ? 'реєстрація' : 'вхід'}
            </p>
          </>
        ) : (
          <Button className={styles.submit_button} onClick={handleClickSubmit} disabled={loading}>
            Увійти
          </Button>
        )}
      </div>
    </>
  );
}

export default AuthorizationModule;
