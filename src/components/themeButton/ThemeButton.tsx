import { useTheme, THEME_CONSTANT_DARK } from '../../utils/themeContext';
import styles from './ThemeButton.module.css';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className={styles['theme-container']}>
      <label htmlFor={'theme-btn'} className={styles.switch}>
        <input
          id={'theme-btn'}
          type={'checkbox'}
          name={'theme'}
          title="Theme Toggle"
          aria-label="Theme Toggle"
          checked={theme === THEME_CONSTANT_DARK}
          onChange={handleChange}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default ThemeButton;
