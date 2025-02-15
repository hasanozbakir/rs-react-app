import React from 'react';
import { useTheme } from '../App';
import styles from './ThemeButton.module.css'

const ThemeButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const handleChange = () => {
      toggleTheme();
    };
    
    return (
        <div className={styles['theme-container']}>
            <label htmlFor={'theme-btn'} className={styles.switch}>
                <input 
                    id={'theme-btn'} 
                    type={"checkbox"} 
                    name={'theme'} 
                    title="Theme Toggle" 
                    checked={theme === 'dark'}
                    onChange={handleChange} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
    
}

export default ThemeButton;