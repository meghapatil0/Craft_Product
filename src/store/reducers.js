const initialstate = {    
    product: []    
};    
    
const reducer = (state = initialstate, action) => {   
    debugger 
    switch (action.type) {
        case 'ITEMS_RECEIVED':
            return { ...state, product: action.items }  
        case 'ADD_PRODUCT':    
            return {    
                ...state,    
                product: state && state.product && state.product.concat(action.payload)    
        }; 
        default:    
            return state;    
    }    
};    
    
export default reducer;   