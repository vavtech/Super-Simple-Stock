import React from 'react';
import MyModal from '../modal/MyModal'

const Options = () => {

    const data = [{
        id: "DY",
        name: "Calculate Dividend Yield",
        title: "Dividend Yield",
        description: "Calulating Dividend Yield",
        showSelectionAndInput: true
    },
    {
        id: "PE",
        name: "Calculate P/E Ratio",
        title: "P/E Ratio",
        description: "Calulating P/E Ratio",
        showSelectionAndInput: true
    },
    {
        id: "RT",
        name: "Record Trade",
        title: "Record Trade",
        description: "Recording a stock trade",
        showSelectionAndInput: false
    },
    {
        id: "VWSP",
        name: "calculate VWSP",
        title: "Volume Weighted Stock Price",
        description: "Calulating Volume Weighted Stock Price, based on trades in past 'x' minutes (Default is 15 minutes)",
        showSelectionAndInput: true
    },
    {
        id: "GBCE",
        name: "Calculate GBCE All Share Index",
        title: "Calculate GBCE All Share Index",
        description: "Calulating GBCE All Share Index using the geometric mean of prices for all stocks",
        showSelectionAndInput: true
    }
    ]

    return (
        <div style={{ marginTop: 50, marginBottom: 50, display: 'inline-flex' }}>
            {data.map(item => {
                return (
                    <MyModal
                        key={item.id}
                        id={item.id}
                        showSelectionAndInput={item.showSelectionAndInput}
                        buttonName={item.name}
                        title={item.title}
                        description={item.description} />
                );
            })
            }
        </div>
    );

}

export default Options;