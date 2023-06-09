import styles from './style.module.scss';

import { Link } from 'react-router-dom';

import IconLink from '../../ui/IconLink';
import { LogoutIcon, RecordsIcon, ContactsIcon, HomeIcon, WorkersIcon } from '../../ui/Icon';

import profileImage from '../../ui/images/default_avatar.png';
import { useAuth } from '../../hooks/auth.hook';
import Loading from '../../ui/Loading';

function SideNavbar({ currentTab }) {
  const { isAuthorization, logout, ready, role } = useAuth();

  function handleClickLogout() {
    logout();
  }

  if (ready === false) {
    return <Loading />;
  }

  return (
    <div className={styles.side_navbar}>
      <Link className={styles.profile_link} to="/profile">
        <img src={profileImage} />
      </Link>

      <IconLink linkPath="/home" icon={<HomeIcon />} isActive={currentTab === 'home'}>
        Головна
      </IconLink>
      <IconLink linkPath="/contacts" icon={<ContactsIcon />} isActive={currentTab === 'contacts'}>
        Контакти
      </IconLink>

      {isAuthorization && (
        <>
          {role === 'admin' ? (
            <IconLink linkPath="/link" icon={<WorkersIcon />} isActive={currentTab === 'link'}>
              Зв'язання
            </IconLink>
          ) : (
            <IconLink linkPath="/marks" icon={<RecordsIcon />} isActive={currentTab === 'marks'}>
              Записи
            </IconLink>
          )}
          <IconLink
            className={styles.logout_link}
            icon={<LogoutIcon />}
            onClick={handleClickLogout}>
            Вийти
          </IconLink>
        </>
      )}
    </div>
  );
}

export default SideNavbar;
