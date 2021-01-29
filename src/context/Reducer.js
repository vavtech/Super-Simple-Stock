const Reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_STOCKS':
            return {
                ...state,
                stocks: action.payload
            };
        case 'UPDATE_TRADE':
            return {
                ...state,
                trades: state.trades.concat(action.payload)
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;