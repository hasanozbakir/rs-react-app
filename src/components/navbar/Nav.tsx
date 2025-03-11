import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/react-hook-form" className={styles.navLink}>
            React Hook Form
          </Link>
        </li>
        <li>
          <Link to="/uncontrolled-form" className={styles.navLink}>
            Uncontrolled Form
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
