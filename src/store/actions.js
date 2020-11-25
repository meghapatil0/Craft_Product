const axios = require('axios');

export const getProduct = () => (dispatch) => {
    const url = 'http://localhost:4000/product';
    fetch(url, {
        method: "get"
    })
    .then(res => res.json())
    .then(response => {
        console.log('response',response)
        dispatch({type: 'ITEMS_RECEIVED', items: response.data});
    });
}

  export const addProduct = (data) => {
      debugger
    debugger
    return (dispatch) => {
        const url = 'http://localhost:4000/product';
        axios.post(url,data).then(resp => {
            console.log(resp)
            return dispatch({
                type: "ADD_PRODUCT",
                payload: resp,
              });
        });
    };
  };
  