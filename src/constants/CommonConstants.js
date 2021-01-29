module.exports = Object.freeze({

    // Error Messages
    INVALID_STOCK: "Please select a stock symbol !!",
    INVALID_PRICE: "Please enter price!!",
    INVALID_MINUTES: "Please enter minutes !!",
    INVALID_QUANTITY: "Please enter quantity !!",
    SOMETHING_WENT_WRONG: "Something went wrong !! (Service is down)",

    // Common Utils
    COLON: ":",
    FORWARD_SLASH: "/",
    LOADING: "Loading...",
    TRADE_SUCCESS: "Trade Success !!",

    // Reducer Actions
    DISPATCH_FETCH_STOCKS: "FETCH_STOCKS",
    DISPATCH_UPDATE_TRADE: "UPDATE_TRADE",
    DISPATCH_SET_ERROR: "SET_ERROR",


    // API Utils  
    PORT: "8080",
    BASE_URL: "http://localhost",
    TRADE_URL: "recodeTrade",
    LIST_STOCKS_URL: "listStocks",
    DIVIDEND_YIELD_URL: "calculateDividendYield",
    PE_RATIO_URL: "calculatePERatio",
    VWSP_URL: "calculateVWSP",
    GBCE_URL: "calculateGBCEShareIndex"
});