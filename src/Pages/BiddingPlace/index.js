import React, { useEffect, useState } from 'react';
import '../MarketPlace/MarketPlace.css';
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneCopy } from 'react-icons/ai';
import { useHistory } from "react-router";

const names = [
  {
    id: 0,
    title : ""
  },
  {
    id: 1,
    title: "Rambagh Palace"
  },
  {
    id: 2,
    title: "Amer Palace"
  },
  {
    id: 3,
    title: "Jal Mahal"
  },  {
    id: 4,
    title: "Hawa Mahal"
  }
]

export const BiddingPlace =()=>{
    const history = useHistory();
    const [myState,SetmyState] = useState({
        bidding_tokenid:'',
        bidding_bid:'',
        listNFTforsale_tokenid:'',
        nftBuy_tokenid:'',
        stopBid_tokenid:'',
        getHeigestBid_tokenid:'',
        bidding_name: ''
    })
    const storeData = useSelector((state) => state.data);
    const blockchain = useSelector((state) => {console.log('checking bchain',state.blockchain); return state.blockchain});
    console.log("Bidding place",{storeData})
    useEffect(()=>{SetmyState({...myState, bidding_tokenid:storeData.nft_token})},[storeData])
    // const storeData = useSelector((state) => { SetmyState({...myState, bidding_bid:state.data.nft_token})});
    
    const listForNftFunction = () => {
        console.log('Approver running ... ',myState.listNFTforsale_tokenid, blockchain.account3)
        blockchain.smartContract3.methods
        .listNFTforsale(myState.listNFTforsale_tokenid)
        .send({ from: blockchain.account3})
        .once("error",(err) => {
          console.log(err) ;
        })
        .then((receipt)=>{
          console.log("receipt: ",receipt);
        //   setLoading(false);
          // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
          // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        //   setStatus("successfully approved your coins to marketplace :) !");
        })
        .catch(e=>{
          console.log('Aprrover NFT Token : ',e)
        })
      }

      const biddingFunc = () => {
        if(myState.bidding_name.length === 0){
          alert("Select a valid name");
          return;
        }
        console.log('Approver running ... ')
        blockchain.smartContract3.methods
        .bidding(myState.bidding_tokenid,myState.bidding_bid,myState.bidding_name)
        .send({ from: blockchain.account3})
        .once("error",(err) => {
          console.log(err) ;
        })
        .then((receipt)=>{
          console.log("receipt: ",receipt);
        //   setLoading(false);
          // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
          // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        //   setStatus("successfully approved your coins to marketplace :) !");
        })
        .catch(e=>{
          console.log('Aprrover NFT Token : ',e)
        })
      }

      const stopBiddingFunc = () => {
        console.log('Approver running ... ')
        blockchain.smartContract3.methods
        .stopBid(myState.stopBid_tokenid)
        .send({ from: blockchain.account3})
        .once("error",(err) => {
          console.log(err) ;
        })
        .then((receipt)=>{
          console.log("receipt: ",receipt);
        //   setLoading(false);
          // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
          // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        //   setStatus("successfully approved your coins to marketplace :) !");
        })
        .catch(e=>{
          console.log('Aprrover NFT Token : ',e)
        })
      }
      
      const buyNftFunc = () => {
        console.log('Approver running ... ')
        blockchain.smartContract3.methods
        .nftBuy(myState.nftBuy_tokenid)
        .send({ from: blockchain.account3})
        .once("error",(err) => {
          console.log(err) ;
        })
        .then((receipt)=>{
          console.log("receipt: ",receipt);
        //   setLoading(false);
          // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
          // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        //   setStatus("successfully approved your coins to marketplace :) !");
        })
        .catch(e=>{
          console.log('Aprrover NFT Token : ',e)
        })
      }

      const getHighestBidFunc = () => {
        console.log('Approver running ... ')
        blockchain.smartContract3.methods.getHeigestBid(myState.getHeigestBid_tokenid)
        .call({from:blockchain.account3})
        .once("error",(err) => {
          console.log(err) ;
        })
        .then((receipt)=>{
          console.log("receipt: ",receipt);
        //   setLoading(false);
          // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
          // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        //   setStatus("successfully approved your coins to marketplace :) !");
        })
        .catch(e=>{
          console.log('Aprrover NFT Token : ',e)
        })
      }

    const getNameOptions = () =>{
      return names.map(item=> <option value={item.title} key={item.id}>{item.title}</option>)
    }


    return  <div className='market-place'>
                {console.log({storeData})}
                <div className='row'>
                    <div className='col-md-12 mt-4 text-center text-white'>
                        <span className='header'>Bidding Place</span>
                    </div>
                    <div className='col-md-12 mt-5 d-flex justify-content-center'>
                        <div className='custom-card-body biddingPlace-Card'>
                            <div className='row'>
                                {console.log("-- ",myState.bidding_tokenid,myState.bidding_bid)}
                                <div className='col-md-12'>
                                    Place your Bid
                                </div>
                                <div className='col-md-5'>
                                    <div style={{widthL:'100%',float:'right'}}>Token Id </div>
                                </div>
                                <div className='col-md-7'>
                                    <input type="number" value={myState.bidding_tokenid} onChange={(e)=>SetmyState({...myState,bidding_tokenid:e.target.value})} placeholder='' className='form-control' />
                                </div>
                                <div className='col-md-5 mt-2'>
                                    <div style={{widthL:'100%',float:'right'}}>Bid</div>
                                </div>
                                <div className='col-md-7 mt-2'>
                                    <input type="number"  value={myState.bidding_bid} onChange={(e)=>SetmyState({...myState,bidding_bid:e.target.value})}  placeholder='' className='form-control' />
                                </div>
                                <div className='col-md-5 mt-2'>
                                    <div style={{widthL:'100%',float:'right'}}>Name</div>
                                </div>
                                <div className='col-md-7 mt-2'>
                                    {/* drop-down */}
                                    <select type="dro"  value={myState.bidding_name} onChange={(e)=>SetmyState({...myState,bidding_name:e.target.value})}  placeholder='' className='form-control'>
                                      {getNameOptions()}
                                    </select>
                                </div>
                                <div className='col-md-12 mt-2'>
                                    <button className='btn btn-warning' onClick={biddingFunc} style={{float:'right'}}>Transact</button> <AiTwotoneCopy color={'#fff'} size={20}  style={{float:'right'}}></AiTwotoneCopy> 
                                </div>
                            </div>


                           
                        </div>
                    </div>
                </div>
                {/* <div className='row mt-2'>
                                <div className='col-md-12'>
                                  <button className='btn btn-secondary' onClick={()=>history.push('/nft-market-place')}>Navigate to MarketPlace</button>
                                </div>
                            </div> */}
            </div>
}