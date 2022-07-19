import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './EmptyLayout.module.css';
import Header from '../../commons/Header/Header';

export const EmptyLayout = ({ children }) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  // const location = useLocation();
  // const pathName = location.pathname;
  // const history = useHistory();
  // const { profileDetails } = useSelector(store => store.user);
  // useEffect(() => {
  //   if (pathName === '/login' &&
  //     window.localStorage.getItem('auth_token') !== null
  //     && profileDetails.firstName) {
  //     history.push('/');
  //   }
  // }, [profileDetails, history, pathName]);

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.wrapper}>
        <div className={styles.navContainer}>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===1 })} onClick={()=>setActiveTab(1)} to={'/'} >Home</Link>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===2 })} onClick={()=>setActiveTab(2)} to={'/token-approve-page'} >Token Approve</Link>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===3 })} onClick={()=>setActiveTab(3)} to={'/nft-market-place'} >Market Place</Link>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===4 })} onClick={()=>setActiveTab(4)} to={'/nft-bidding-place'} >Bidding Place</Link>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===5 })} onClick={()=>setActiveTab(5)} to={'/leadership-board'} >Leadership Board</Link>
            <Link className={classNames(styles.navLink,{[styles.activeTab]: activeTab===6 })} onClick={()=>setActiveTab(6)} to={'/getNFTDetails'} >Get NFT Details</Link>
        </div>
        <div className={styles.childrenContainer}>
            {children}
        </div>
      </div>
    </div>
  )
}