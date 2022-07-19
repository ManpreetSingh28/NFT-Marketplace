// constants
import Web3 from "web3";
import SmartContract from "../../contracts/SmartContract.json";
import SmartContract2 from '../../contracts/ERCForNFT.json';
import SmartContract3 from '../../contracts/Marketplace.json';
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};


const connectSuccess2 = (payload) => {
  return {
    type: "CONNECTION_SUCCESS2",
    payload: payload,
  };
};

const connectSuccess3 = (payload) => {
  console.log('Market Place payload - ',payload)
  return {
    type: "CONNECTION_SUCCESS3",
    payload: payload,
  };
};
const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        const NetworkData = await SmartContract.networks[networkId];
        if (NetworkData) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract.abi,
            NetworkData.address
          );
              
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Relode."));
        }

        //Smart Contract 2
        const NetworkData2 = await SmartContract2.networks[networkId];
        if (NetworkData2) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract2.abi,
            NetworkData2.address
          );
              
          dispatch(
            connectSuccess2({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }

        
        //Smart Contract 3
        const NetworkData3 = await SmartContract3.networks[networkId];
        if (NetworkData3) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract3.abi,
            NetworkData3.address
          );
              
          dispatch(
            connectSuccess3({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

