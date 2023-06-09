import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';

import collection_item1Image from './images/content/screen1.png';
import collection_item2Image from './images/content/screen2.png';
import collection_item3Image from './images/content/screen3.png';
import collection_item4Image from './images/content/screen4.png';
import collection_item5Image from './images/content/screen5.png';

import work_icon1Image from './images/work-icon1.svg';
import work_icon2Image from './images/work-icon2.svg';
import work_icon3Image from './images/work-icon3.svg';

import slider_img1Image from './images/content/slider-img1.png';
import slider_img2Image from './images/content/slider-img2.png';
import slider_img3Image from './images/content/slider-img3.png';
import { useState } from 'react';

function MainPage() {
  const [offsetSlider, setOffsetSlider] = useState(0);
  const maxOffsetSlider = 100;
  const minOffsetSlider = 0;
  const stepOffsetSlider = 100;

  function handleClickRightSlider() {
    setOffsetSlider((prev) =>
      prev + stepOffsetSlider > maxOffsetSlider ? prev : prev + stepOffsetSlider,
    );
  }

  function handleClickLeftSlider() {
    setOffsetSlider((prev) =>
      prev - stepOffsetSlider < minOffsetSlider ? prev : prev - stepOffsetSlider,
    );
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="home" />

        <div className={pageGlobalStyles.content}>
          <h1
            className={pageGlobalStyles.title}
            style={{ visibility: 'hidden', position: 'fixed' }}>
            Головна
          </h1>
          <div className={styles.content_inner}>
            <div className={styles.wrapper}>
              <main className={styles.main}>
                <section className={styles.top}>
                  <div className={styles.top__inner}>
                    <div className={styles.top__left_button} onClick={handleClickLeftSlider}>
                      {'<'}
                    </div>
                    <div className={styles.top__right_button} onClick={handleClickRightSlider}>
                      {'>'}
                    </div>
                    <div
                      className={styles.top__slider}
                      style={{ '--offset-slider': offsetSlider + '%' }}>
                      <div className={styles.top__slider_item}>
                        <div className={styles.top__slider_info}>
                          <h2 className={styles.top__slider_title}>Радій від навчання</h2>
                          <p className={styles.top__slider_text}>
                            Наш сервіс дозволить вам не тримати записи у великих журналах.
                            Зберігайте все в одному місці та контролюйте
                          </p>
                        </div>
                        <img
                          className={styles.top__slider_img}
                          src={slider_img1Image}
                          alt="image slider"
                        />
                      </div>
                      <div className={styles.top__slider_item}>
                        <div className={styles.top__slider_info}>
                          <h2 className={styles.top__slider_title}>Розраховуй не в голові</h2>
                          <p className={styles.top__slider_text}>
                            Аналізуйте не на бумазі. Використовуйте сучасні технології для
                            покращення аналізу ваших оцінок як студента та котролю як викладачу
                          </p>
                        </div>
                        <img
                          className={styles.top__slider_img}
                          src={slider_img3Image}
                          alt="image slider"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className={styles.new_collection}>
                  <div className={styles.container_fluid}>
                    <h3 className={styles.new_collection__title}>Перегляньте наші можливості</h3>
                    <p className={styles.new_collection__text}>
                      Наш сервіс предоставляє різноманітні функції для керування і аналізу оцінок.
                      Спробуйте те, що буде для вас найбільш зручним
                    </p>
                    <div className={styles.collection}>
                      <div className={styles.collection__item}>
                        <img
                          className={styles.collection__img}
                          src={collection_item1Image}
                          alt="collection image"
                        />
                        <div className={styles.collection__info}>
                          <h6 className={styles.collection__info_title}>Перегляд журналу</h6>
                          <p className={styles.collection__info_text}>Всі оцінки учнів</p>
                        </div>
                      </div>
                      <div className={styles.collection__item}>
                        <img
                          className={styles.collection__img}
                          src={collection_item2Image}
                          alt="collection image"
                        />
                        <div className={styles.collection__info}>
                          <h6 className={styles.collection__info_title}>Перегляд деталей</h6>
                          <p className={styles.collection__info_text}>
                            Перегляд для студента, редагування для викладача
                          </p>
                        </div>
                      </div>
                      <div className={styles.collection__item}>
                        <img
                          className={styles.collection__img}
                          src={collection_item3Image}
                          alt="collection image"
                        />
                        <div className={styles.collection__info}>
                          <h6 className={styles.collection__info_title}>Фільтрація</h6>
                          <p className={styles.collection__info_text}>Оберіть проміжок дат</p>
                        </div>
                      </div>
                      <div className={styles.collection__item}>
                        <img
                          className={styles.collection__img}
                          src={collection_item4Image}
                          alt="collection image"
                        />
                        <div className={styles.collection__info}>
                          <h6 className={styles.collection__info_title}>Адміністрування</h6>
                          <p className={styles.collection__info_text}>
                            Видаляйте, прив'язуйте студентів та викладачів
                          </p>
                        </div>
                      </div>
                      <div className={styles.collection__item}>
                        <img
                          className={styles.collection__img}
                          src={collection_item5Image}
                          alt="collection image"
                        />
                        <div className={styles.collection__info}>
                          <h6 className={styles.collection__info_title}>Особистий кабінет</h6>
                          <p className={styles.collection__info_text}>
                            Зручний вхід та перегляд профілю
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={styles.decor}>
                  <div className={styles.container}>
                    <h2 className={styles.decor__title}>
                      Працюйте <br />з комфортом
                    </h2>
                    <p className={styles.decor__text}>
                      Тепер зручніше налаштувати процес навчання і зі сторони адміністрації, і зі
                      сторони викладача а також і студент може зручно онлайн слідкувати за
                      оцінюванням
                    </p>
                  </div>
                </section>

                <section className={styles.how_work}>
                  <div className={styles.container}>
                    <h3 className={styles.how_work__title}>Як це працює</h3>
                    <div className={styles.how_work__items}>
                      <div className={styles.how_work__items_box}>
                        <div
                          className={`${styles.how_work__item} ${styles.how_work__item__consultation}`}>
                          <img className={styles.how_work__item_img} src={work_icon1Image} alt="" />
                          <h6 className={styles.how_work__item_title}>Адміністрування</h6>
                          <p className={styles.how_work__item_text}>
                            Все починається з реєстрації студентів та викладачів у системі а також
                            їх прив'язування одне до одного
                          </p>
                        </div>
                        <div
                          className={`${styles.how_work__item} ${styles.how_work__item__production}`}>
                          <img className={styles.how_work__item_img} src={work_icon3Image} alt="" />
                          <h6 className={styles.how_work__item_title}>Перегляд</h6>
                          <p className={styles.how_work__item_text}>
                            Насолоджуйтесь зручною роботою з оцінками і переглядом коментарів,
                            зауважень і як зі сторони викладача, так і зі сторони студента
                          </p>
                        </div>
                      </div>
                      <div
                        className={`${styles.how_work__item} ${styles.how_work__item__measurements}`}>
                        <img className={styles.how_work__item_img} src={work_icon2Image} alt="" />
                        <h6 className={styles.how_work__item_title}>Оцінювання</h6>
                        <p className={styles.how_work__item_text}>
                          Викладачі виставляють оцінки, пишуть коментарі або зауваження. Відмічають
                          кожного свого студента по датам
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
