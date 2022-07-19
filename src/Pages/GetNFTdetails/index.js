import React, { useEffect, useState } from 'react';
import '../MarketPlace/MarketPlace.css';
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneCopy } from 'react-icons/ai';
import { useHistory } from "react-router";
import styles from './GetNFTdetails.module.css';
import './GetNFTdetails.css';
import classNames from 'classnames';
import Button from '../../commons/Button/Button';
import { fetchData } from '../../redux/data/dataActions';


export const GetNFTdetails =()=>{
    const history = useHistory();
    const blockchain = useSelector((state) => state.blockchain);
    const [loading , setLoading ] = useState(false);
    const [status ,setStatus] = useState("");
    const [tokenId ,setTokenId] = useState("");
    const [URL ,setURL] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
   
    const getNFTDetails = () => {
      console.log('Get NFT Details running ... ')
      blockchain?.smartContract?.methods
      .tokenURI(tokenId)
      .call({ from: blockchain.account2})
      // .once("error",(err) => {
      //   console.log(err) ;
      // })
      .then((imgURL)=>{
        console.log(imgURL)
        if(imgURL){
          fetch(imgURL).then(res=>res.json()).then((jsonData)=>{
            setURL(jsonData?.image ? jsonData.image : imgURL);
            console.log("Img URL: ",{jsonData});
          }).catch(e=>console.log(e))
        }
        // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
        // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    console.log("tokenId : ",tokenId)
    return (<div className='market-place getNFTdetails' >
    <div className='row'>
        <div className='col-md-12 mt-4 text-center text-white'>
            <span className='header'>Get NFT Details</span>
        </div>
        <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
                <div className='row'>
                    {/* <div className='col-md-12'>
                        Place your Bid
                    </div> */}
                    <div className='col-md-5'>
                        <div style={{widthL:'100%',float:'right'}}>Token id :  </div>
                    </div>
                    <div className='col-md-7'>
                        <input type="integer" value={tokenId} onChange={(e)=>{setTokenId(e.target.value)}} placeholder='' className='form-control' />
                    </div>
                    <div className='col-md-12 mt-2'>
                        <button className='btn btn-warning' onClick={()=>getNFTDetails()} style={{float:'right'}}>Transact</button> <AiTwotoneCopy color={'#fff'} size={20}  style={{float:'right'}}></AiTwotoneCopy> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    {URL && <div className={styles.imageWrapper}>
          <img src={URL} className={styles.img}/>
    </div>}
</div>)
}