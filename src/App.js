import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouteWithLayout from './Layout/RouteWithLayout';
import "./App.css";
import { EmptyLayout } from "./Layout/EmptyLayout/EmptyLayout";
import { Wallet } from "./Pages/Wallet";
import { MarketPlace } from "./Pages/MarketPlace";
import { BiddingPlace } from "./Pages/BiddingPlace";
import { TokenApprovePage } from "./Pages/TokenApprovePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LeaderShipBoard } from "./Pages/LeaderShipBoard";
import { GetNFTdetails } from "./Pages/GetNFTdetails";



function App() {
  return (
    <Router>
      <Switch>
        <RouteWithLayout layout={EmptyLayout} path="/" exact component={Wallet}></RouteWithLayout>
        <RouteWithLayout layout={EmptyLayout} path="/nft-market-place"  component={MarketPlace}></RouteWithLayout>
        <RouteWithLayout layout={EmptyLayout} path="/nft-bidding-place"  component={BiddingPlace}></RouteWithLayout>
        <RouteWithLayout layout={EmptyLayout} path="/token-approve-page"  component={TokenApprovePage}></RouteWithLayout>
        <RouteWithLayout layout={EmptyLayout} path="/leadership-board"  component={LeaderShipBoard}></RouteWithLayout>
        <RouteWithLayout layout={EmptyLayout} path="/getNFTDetails"  component={GetNFTdetails}></RouteWithLayout>
      </Switch>
    </Router>
  );
}

export default App;


// import React, { useEffect, useState, useRef } from "react";
// import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { connect } from "./redux/blockchain/blockchainActions";
// import { fetchData } from "./redux/data/dataActions";
// import * as s from "./styles/globalStyles";
// import styled from "styled-components";
// import { create } from "ipfs-http-client";
// import ReactSignatureCanvas from "react-signature-canvas";

// const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

// export const StyledButton = styled.button`
//   padding: 8px;
// `;

// function App() {
//   const dispatch = useDispatch();
//   const blockchain = useSelector((state) => state.blockchain);
//   const data = useSelector((state) => state.data);
//   const [loading , setLoading ] = useState(false);
//   //Pratik
//   const [myfile,SetmyFile] = useState('');
//   useEffect(()=>{
//     console.log('myFile Setting Completed --',myfile)

   
//   },[myfile])
//   //Pratik
//   const [status ,setStatus] = useState("");
//   const [NFTS , setNFTS] = useState([]);
//   const elementRef = useRef() ;
//   const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
//   const name = "Signature NFT " ;
//   const description = "My signature NFT !!"


//   const mint = (_uri) => {

//     blockchain.smartContract.methods
//     .Mint(_uri)
//     .send({ from: blockchain.account})
//     .once("error",(err) => {
//       console.log(err) ;
//     })
//     .then((receipt)=>{
//       console.log("receipt: ",receipt);
//       setLoading(false);
//       setStatus("successfully minted your NFT :) !");
//     })
//   }
  
//   const createMetaDataAndMint = async (_name,_des,_imgBuffer) => {
//     setLoading(true);
//     setStatus("Uploading to IPFS .. !");
//     try {

//       const addedImage = await ipfsClient.add(_imgBuffer);
//       // console.log( ipfsBaseUrl +addedImage.path);

//       const metadataObj = {
//       description: _des, 
//       image: ipfsBaseUrl +addedImage.path, //Needs to display in the bottom of the screen
//       name: _name
//     }

//     console.log("Testing IPFS - ",metadataObj.image)

//     const addedMetadata = await ipfsClient.add(JSON.stringify(metadataObj));

//     console.log (ipfsBaseUrl + addedMetadata.path) ;
//     mint(ipfsBaseUrl + addedMetadata.path) ;

//     }catch(err) {
//       console.log(err) ;
//     }
//   };

//   const startMintingProcess = () => {
//     setLoading(true);
//     createMetaDataAndMint (name , description,getImageData() ) ;
//   };

//   const getImageData = () => {
//     // const canvasEl = elementRef.current ;
//     // let dataUrl = canvasEl.toDataURL("image/png");
//     // const buffer = Buffer(myfile);//.split(",")[1],"base64") ;
//     console.log("buffer: ",myfile);
//     return myfile ;
//   } 
  

//   useEffect(() => {
//     if (blockchain.account !== "" && blockchain.smartContract !== null) {
//       dispatch(fetchData(blockchain.account));
//     }
//   }, [blockchain.smartContract, dispatch]);

//   return (
//     <s.Screen>
//       {blockchain.account === "" || blockchain.smartContract === null ? (
//         <s.Container flex={1} ai={"center"} jc={"center"}>
//           <s.TextTitle>Connect to the Blockchain</s.TextTitle>
//           <s.SpacerSmall />
//           <StyledButton
//             onClick={(e) => {
//               e.preventDefault();
//               dispatch(connect());
//             }}
//           >
//             CONNECT
//           </StyledButton>
//           <s.SpacerSmall />
//           {blockchain.errorMsg !== "" ? (
//             <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
//           ) : null}
//         </s.Container>
//       ) : (
//         <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
//           <s.TextTitle style={{ textAlign: "center" }}>
//             Welcome to mint your signature.
//           </s.TextTitle>
//           {loading ? (
//           <>
//             <s.SpacerSmall />
//             <s.TextDescription style={{ textAlign: "center" }}>
//               loading ...
//             </s.TextDescription>
//           </>
//           ) : null }
//         {status !== "" ? (
//           <>
//             <s.SpacerSmall />
//             <s.TextDescription style={{ textAlign: "center" }}>
//               {status}
//             </s.TextDescription>
//           </>
//           ) : null }
//           <s.SpacerLarge />
//           <StyledButton
//             onClick={(e) => {
//               e.preventDefault();
//               startMintingProcess();
//             }}
//           >
//             Mint
//           </StyledButton>
//           <s.SpacerLarge />
//         <input type="file" accept="image/png, image/svg, image/jpeg" onChange={(e)=>{
          
//           const file = e.target.files[0];
//           // SetmyFile(file);
//           file.arrayBuffer().then(buff => {
//             let x = new Uint8Array(buff);
//             console.log("buffer- -- ", x);
//             SetmyFile(x); 
//             // x is your uInt8Array
//             // perform all required operations with x here.
//         })
          
//           // encode the file using the FileReader API
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             // use a regex to remove data url part
//             const base64String = reader.result
//               .replace("data:", "")
//               .replace(/^.+,/, "");
//               // SetmyFile(base64String);
//             // log to console
//             // logs wL2dvYWwgbW9yZ...
//             // console.log(base64String);

//           };
//           console.log(reader.readAsDataURL(file))
//           // SetmyFile(reader.readAsDataURL(file));
          
//         }}/>
//             {/* <ReactSignatureCanvas 
//                penColor='white'
//                backgroundColor={'#0000FF'} 
//               canvasProps={{ width:350, height:350 }}
//               ref = {elementRef}/> */}
//         </s.Container>
//       )}
//     </s.Screen>
//   );
// }

// export default App;
