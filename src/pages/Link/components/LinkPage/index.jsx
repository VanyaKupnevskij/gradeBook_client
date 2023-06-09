import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import LinkModule from '../../../../modules/LinkModule/components/ModuleMain';

function LinkPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="link" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Зв'язання вчителів з учнями</h1>
          <div className={pageGlobalStyles.content_inner}>
            <LinkModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkPage;
