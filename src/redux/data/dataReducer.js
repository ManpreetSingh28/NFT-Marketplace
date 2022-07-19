const initialState = {
  loading: false,
  name: "",
  nft_token:'',
  error: false,
  errorMsg: "",

};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        name: action.payload.name,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "STORE_NFT_TOKEN":
      return {
        ...initialState,
        nft_token:action.payload
      }
    default:
      return state;
  }
};

export default dataReducer;
