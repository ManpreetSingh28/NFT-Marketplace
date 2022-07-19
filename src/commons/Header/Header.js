import { useHistory } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const history = useHistory();
    return(
        <div className={styles.wrapper}>
            <div className={styles.leftContainer}>
                <div className={styles.headingText} onClick={()=>history.push('/')}>My Wallet</div>
            </div>
            <div id='headerRightContainer' className={styles.rightContainer}>
                
            </div>
        </div>
    )
}

export default Header;