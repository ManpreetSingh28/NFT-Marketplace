import React, { useEffect, useState } from 'react';
import '../MarketPlace/MarketPlace.css';
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneCopy } from 'react-icons/ai';
import { useHistory } from "react-router";
import styles from './LeaderShipBoard.module.css';
import './LeaderShipBoard.css';
import classNames from 'classnames';
import Button from '../../commons/Button/Button';
import { fetchData } from '../../redux/data/dataActions';

export const LeaderShipBoard =()=>{
    const history = useHistory();
    const blockchain = useSelector((state) => state.blockchain);
    const [loading , setLoading ] = useState(false);
    const [status ,setStatus] = useState("");
    const [address ,setAddress] = useState("");
    const [receipt ,setReceipt] = useState("");
    const [addresses, setAddresses] = useState([
      {name:'Team 1', addr: '0x0cBcD7f3fD403f49b50efaC09d942f701177087D'},
      {name:'Team 2', addr: '0x766781E665a18723146FF6AFCE30cFD3a5F2b55c'},
      {name:'Team 3', addr: '0x1b2cC63AD3897087194769106F36B26208EaFdeF'},
      {name:'Team 4', addr: '0xE1A8E1B7AFb065Cf8eCd825c6F589fe82Ab2f6bA'},
      {name:'Team 5', addr: '0xcB3077C1707AEb51e9064019294FbBc3b8f8412B'},
      {name:'Team 6', addr: '0xb2459D976Ee7D04e5920aABe29970A36f15cBC77'},
      {name:'Team 7', addr: '0x126B83a24eF032baBd4eF3Be5B72e6AFcaE4265C'},
      {name:'Team 8', addr: '0x92De592C78124Cb65c4661f544de61292FA7E2Ab'},
      {name:'Team 9', addr: '0x74643382907907304A3b6BB5EE8Df1ddBE16184A'},
      {name:'Team 10', addr: '0xcE799e65441E3C9CCe2fab28218Af61699CA6702'},
      {name:'Team 11', addr: '0x8081DDa005B2CE10c8F6dF0d6f893ce5E09eD7D1'},
      {name:'Team 12', addr: '0x356DF19f1985cFe379d7C6bDBC992329a277b864'},
      {name:'Team 13', addr: '0x82274A34eFc2A250ee4d6d04A9C8B855E09c07D8'},
      {name:'Team 14', addr: '0x3b9f278C09bFDEb7C48ef20C794cC9aD3003543a'},
      {name:'Team 15', addr: '0xBd8d49a238cFB6Ba855b9320F6c2c00d909F9DF9'},
      {name:'Team 16', addr: '0x7E2Bc20a6e840B5003B6773240C22AfF0Ebf14b7'},      
      {name:'Team 17', addr: '0x0864E0588967C9DD8df1b3ca63E94BD14A0D7fA8'},      
      {name:'Team 18', addr: '0x120cf40C292F5E972fAB2bEf70acde14cE54bb59'},      
      {name:'Team 19', addr: '0x9863CCDf790cf2645c9D872C725Db4E8052353EB'},
      {name:'Team 20', addr: '0xC360e5E3B1834D7e146c95aDdDf72d87BAf42101'},


    ]);
    const [allLeadershipFlag, setAllLeadershipFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
   
    const approveNftTokenAll = () => {
      console.log('Approver running ... ')
      Promise.all(addresses.map((item)=>blockchain?.smartContract2?.methods
      .balanceOf(item.addr)
      .call({ from: blockchain.account2}))).then((responses)=>{
        console.log("Resust : ************ : ", responses)
        const temp = [...addresses];
        addresses.forEach((item, index)=>{
            temp[index]["amount"] = responses[index];
        });
        setAddresses(temp.sort((a,b)=>b.amount-a.amount));
        setAllLeadershipFlag(true);
      }).catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    const approveNftTokenOne = () => {
      console.log('Approver running ... ')
      blockchain?.smartContract2?.methods
      .balanceOf(address)
      .call({ from: blockchain.account2})
      // .once("error",(err) => {
      //   console.log(err) ;
      // })
      .then((receiptNumber)=>{
        console.log("receipt: ",receiptNumber);
        setReceipt(receiptNumber);
        setLoading(false);
        setStatus("successfully approved your coins to marketplace :) !");
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    return (<div className='market-place'>
    <div className='row'>
        <div className='col-md-12 mt-4 text-center text-white'>
            <span className='header'>LEADERSHIP BOARD</span>
        </div>
        <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
                <div className='row'>
                    <div className='col-md-5'>
                        <div style={{widthL:'100%',float:'right'}}>Wallet Address </div>
                    </div>
                    <div className='col-md-7'>
                        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='' className='form-control' />
                    </div>
                    <div className='col-md-12 mt-2'>
                        <button className='btn btn-warning' onClick={()=>approveNftTokenOne()} style={{float:'right'}}>Transact</button> <AiTwotoneCopy color={'#fff'} size={20}  style={{float:'right'}}></AiTwotoneCopy> 
                    </div>
                    {receipt && <div title={address} className={styles.text}>Your current wallet balance is : {receipt}</div>}
                </div>
            </div>
        </div>
        <div className='mt-4 mb-4'>
          <div className='col-md-3'>
            <button className='btn btn-warning' onClick={()=>approveNftTokenAll()} style={{float:'right'}}>All Transactions</button>
          </div>
        </div>
        {
          allLeadershipFlag ? (
            <div className='col-md-12 mt-5 d-flex justify-content-center'>
            <div className='custom-card-body biddingPlace-Card'>
            <div className='row mb-3'>
                      <div className='col-md-1'>
                        Ranking
                      </div>
                      <div className='col-md-2'>
                          Name
                      </div>
                      <div className='col-md-7'>
                        Address
                      </div>
                      <div className='col-md-2'>
                        Amount
                      </div>
            </div>
              {
                addresses.map((item, index) =>{
                  return(
                    <div key={index} className='row mb-2'>
                      <div className='col-md-1'>
                        {index + 1}
                      </div>
                      <div className='col-md-2'>
                          {item["name"]}
                      </div>
                      <div className='col-md-7'>
                        {item["addr"]}
                      </div>
                      <div className='col-md-2'>
                        {item["amount"]}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            </div>
          ) : null
        }
    </div>
</div>)
}