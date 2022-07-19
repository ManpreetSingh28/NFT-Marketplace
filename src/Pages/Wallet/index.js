import React, { useEffect, useState, useRef } from "react";
// import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData, setDataTokenToStore } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import styles from './wallet.module.css';
import styled from "styled-components";
import { create } from "ipfs-http-client";
import ReactSignatureCanvas from "react-signature-canvas";
import { useHistory } from "react-router";
import { FaFolderOpen } from 'react-icons/fa';
import Button from "../../commons/Button/Button";

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

export const StyledButton = styled.button`
  padding: 8px;
`;
export const Wallet =()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [metaResponseImg, setMetaRes]=useState({link1:'',link2:''});
    const [myState, setMyState] = useState({nftToken:''})
    const [loading , setLoading ] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(false);
    //Pratik
    const [myfile,SetmyFile] = useState('');
    useEffect(()=>{
      console.log('myFile Setting Completed --',myfile)
      
    },[myfile])
    //Pratik
    const [status ,setStatus] = useState("");
    const [NFTS , setNFTS] = useState([]);
    const elementRef = useRef() ;
    const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
    const name = "KPMG NFT " ;
    const description = "This NFT belongs to me !!"
  
  
    const mint = (_uri) => {
  
      blockchain.smartContract.methods
      .Mint(_uri)
      .send({ from: blockchain.account})
      .once("error",(err) => {
        console.log(err) ;
      })
      .then((receipt)=>{
        console.log("receipt: ",receipt.events.Transfer.returnValues.tokenId);
        setLoading(false);
        setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
        dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        setStatus("successfully minted your NFT :) !");
      })
    }
    
    const approveNftToken = () => {
      console.log('Approver running ... ')
      blockchain.smartContract.methods
      .approve('0x21496Ee65EB7bfa3298409F104Ff335A949f2a71', myState.nftToken)
      .send({ from: blockchain.account})
      .once("error",(err) => {
        console.log(err) ;
      })
      .then((receipt)=>{
        console.log("receipt: ",receipt);
        setLoading(false);
        // setMyState({...myState, nftToken:receipt.events.Transfer.returnValues.tokenId})
        // dispatch(setDataTokenToStore(receipt.events.Transfer.returnValues.tokenId))
        setStatus("successfully approved your NFT to marketplace :) !");
      })
      .catch(e=>{
        console.log('Aprrover NFT Token : ',e)
      })
    }

    const approveNftToken2 = () => {
      console.log('Approver running ... ')
      blockchain.smartContract2.methods
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
  
    const createMetaDataAndMint = async (_name,_des,_imgBuffer) => {
      setLoading(true);
      setStatus("Uploading to IPFS .. !");
      try {
  
        const addedImage = await ipfsClient.add(_imgBuffer);
        // console.log( ipfsBaseUrl +addedImage.path);
  
        const metadataObj = {
        description: _des, 
        image: ipfsBaseUrl +addedImage.path, //Needs to display in the bottom of the screen
        name: _name
      }
      setMetaRes({...metaResponseImg,link1:metadataObj.image})
  
      // console.log("Testing IPFS - ",metadataObj.image)
  
      const addedMetadata = await ipfsClient.add(JSON.stringify(metadataObj));
  
      console.log ('IPFS IMG URL -- ',metadataObj.image) ;
      mint(ipfsBaseUrl + addedMetadata.path)
      // mint(ipfsBaseUrl + addedMetadata.path) ;
  
      }catch(err) {
        console.log(err) ;
      }
    };
  
    const startMintingProcess = () => {
      setLoading(true);
      createMetaDataAndMint (name , description,getImageData() ) ;
    };
  
    const getImageData = () => {
      // const canvasEl = elementRef.current ;
      // let dataUrl = canvasEl.toDataURL("image/png");
      // const buffer = Buffer(myfile);//.split(",")[1],"base64") ;
      // console.log("buffer: ",buffer);
      return myfile ;
    } 
    
  
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
  
    return (
        <div className={styles.container}>
        {(blockchain.account === "" || blockchain.smartContract === null) ? (
          <div className={styles.connectBtnWrapper}>
            <div className={styles.text}>Connect to the Blockchain</div>
            <Button
              onClicked={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
              text='CONNECT'
            />
            {blockchain.errorMsg !== "" ? (
              <div className={styles.text}>{blockchain.errorMsg}</div>
            ) : null}
          </div>
        ) : (
          <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
            <div className={styles.text}>  Welcome to mint your picture.</div>
            {loading ? (
            <>
              <div className={styles.text}>  loading ... </div>
            </>
            ) : null }
             {status && <div className={styles.text}>{status}</div>}
            {(metaResponseImg.link1=='' && isFileSelected) && <StyledButton
              onClick={(e) => {
                e.preventDefault();
                startMintingProcess();
              }}
              className="btn btn-secondary"
            >
              Mint
            </StyledButton>}
            <s.SpacerLarge />
            {/* {metaResponseImg.link1!='' &&  */}
            {/* <button className="btn btn-secondary mt-3" onClick={()=> history.push('/nft-market-place')}>Navigate To MarketPlace</button> */}
            {/* } */}
         
          { metaResponseImg.link1=='' && 
          
          <label htmlFor="uploadFiles" className="btn mt-2" >
                                <div><FaFolderOpen color="#2F84E9" size={60} style={{cursor:'pointer'}}></FaFolderOpen></div>
                                <div style={{fontSize:'small'}}><span style={{color:'#B4B4B4'}}>Drag & Drop your files here or </span><span style={{color:'#0071A9',cursor:'pointer'}}>Browse</span></div>
                                {/* <input type="file" name="file" id="uploadFiles" name="additionalDocuments" onChange={this.handleChange} multiple/> */}

                                
          <input type="file" style={{display:'none'}} name="file" id="uploadFiles" accept="image/png, image/svg, image/jpeg" onChange={(e)=>{
            
            const file = e.target.files[0];
            if(file?.name){
              setIsFileSelected(true);
              file.arrayBuffer().then(buff => {
                let x = new Uint8Array(buff);
                console.log("buffer- -- ", x);
                SetmyFile(x); 
                // x is your uInt8Array
                // perform all required operations with x here.
            })
    
              // encode the file using the FileReader API
              const reader = new FileReader();
              reader.onloadend = () => {
                // use a regex to remove data url part
                const base64String = reader.result
                  .replace("data:", "")
                  .replace(/^.+,/, "");
                  // SetmyFile(base64String);
  
  
  
                // log to console
                // logs wL2dvYWwgbW9yZ...
                // console.log(base64String);
    
              };
              console.log(reader.readAsDataURL(file))
              // SetmyFile(reader.readAsDataURL(file));
            }
          }}/>
          </label>
          
          
          }
          {/* history.push('/nft-market-place') */}

          {status=="successfully minted your NFT :) !" &&  <div className={styles.text}> Your NFT Token ID : {myState.nftToken}</div>}
         
          {/* {status=="successfully minted your NFT :) !" &&  */}
          <button className="mt-3 mb-3 btn btn-secondary"  onClick={()=> approveNftToken()}>Allow your NFT token on market place</button>
          
          {/* {status=="successfully minted your NFT :) !"  &&  */}
          {/* <button className="mt-3 mb-3 btn btn-secondary"  onClick={()=> approveNftToken2()}>Allow your coins on market place</button> */}
          
          {metaResponseImg.link1!='' && status=="successfully minted your NFT :) !" && <img src={metaResponseImg.link1} style={{width:'100%',height:'100%'}}/>}
          
            {/* <ReactSignatureCanvas 
                 penColor='white'
                 backgroundColor={'#0000FF'} 
                canvasProps={{ width:350, height:350 }}
                ref = {elementRef}/> */}
          </s.Container>
        )}
      </div>
    )
}
