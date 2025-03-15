import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { ROUTES } from '../../utils/constants';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to={ROUTES.HOME} className={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to={ROUTES.CONTROLLED_FORM} className={styles.navLink}>
            React Hook Form
          </Link>
        </li>
        <li>
          <Link to={ROUTES.UNCONTROLLED_FORM} className={styles.navLink}>
            Uncontrolled Form
          </Link>
        </li>
        <li>
          <Link to={ROUTES.USE_ACTION_STATE_FORM} className={styles.navLink}>
            Use Action State Form
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
