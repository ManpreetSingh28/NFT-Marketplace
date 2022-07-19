import styles from './Button.module.css';
import classNames from 'classnames';

const Button = ({onClicked=f=>f, text, classes={}}) => {
    return (
        <button className={classNames(styles.button, classes.button)} onClick={onClicked}>{text || 'SUBMIT'}</button>
    )
}

export default Button;