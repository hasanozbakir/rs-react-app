import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { ROUTES } from '../../utils/constants';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.CONTROLLED_FORM}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            React Hook Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.UNCONTROLLED_FORM}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Uncontrolled Form
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
