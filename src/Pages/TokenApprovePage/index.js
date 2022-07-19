import React, { useEffect, useState } from 'react';
import '../MarketPlace/MarketPlace.css';
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneCopy } from 'react-icons/ai';
import { useHistory } from "react-router";
import styles from './TokenApprove.module.css';
import classNames from 'classnames';
import Button from '../../commons/Button/Button';
import { fetchData } from '../../redux/data/dataActions';


export const TokenApprovePage =()=>{
    const history = useHistory();
    const blockchain = useSelector((state) => state.blockchain);
    const [loading , setLoading ] = useState(false);
    const [status ,setStatus] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
   
    const approveNftToken2 = () => {
      console.log('Approver running ... ')
      blockchain?.smartContract2?.methods
      .approve('0x21496Ee65EB7bfa3298409F104Ff335A949f2a71', 20000000)
      .send({ from: blockchain.account2})
      .once("error",(err) => {
        console.log(err) ;
      })
      .then((receipt)=>{
        console.log("receipt: ",receipt);
        setLoading(false);
        // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
        // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        setStatus("successfully approved your coins to marketplace :) !");
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }


    return  <div className={styles.tokenApprovePage}>
                {loading && <div className={styles.text}>  loading ... </div>}
                <Button onClicked={()=>approveNftToken2()} text='Allow your coins on market place'/>
            </div>
}