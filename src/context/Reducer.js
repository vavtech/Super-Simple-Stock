import Constants from '../constants/CommonConstants';

const Reducer = (state, action) => {
    switch (action.type) {
        case Constants.DISPATCH_FETCH_STOCKS:
            return {
                ...state,
                stocks: action.payload
            };
        case Constants.DISPATCH_UPDATE_TRADE:
            return {
                ...state,
                trades: state.trades.concat(action.payload)
            };
        case Constants.DISPATCH_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;