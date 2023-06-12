import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import RecordsStudentModule from '../../../../modules/RecordsStudentModule';

function RecordsStudentPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="marks" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Записи студента</h1>
          <RecordsStudentModule />
        </div>
      </div>
    </div>
  );
}

export default RecordsStudentPage;
