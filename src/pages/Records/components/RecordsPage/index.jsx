import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import RecordsModule from '../../../../modules/RecordsModule';

function RecordsPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="marks" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Записи</h1>
          <RecordsModule />
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
