import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import "./converter.scss";

const Converter = ({ curData }) => {


    let arrRates = {
        USD: {
            UAH: curData[0].buy * 1,
            BTC: 1 / curData[3].sale
        },
        EUR: {
            UAH: curData[1].buy * 1
        },
        UAH: {
            USD: 1 / curData[0].sale,
            EUR: 1 / curData[1].sale,
            RUR: 1 / curData[2].sale,
        },
        RUR: {
            UAH: curData[2].sale * 1
        },
        BTC: {
            USD: curData[3].buy * 1
        }
    }





    const [output, setOutput] = useState('');
    const [input, setInput] = useState(0);
    const [changeCurrency, setChangeCurrency] = useState("USD");
    const [getCurrency, setGetCurrency] = useState("UAH");
    const [rate, setRate] = useState(arrRates[changeCurrency][getCurrency] || 'UAH');



    useEffect(() => {
        setOutput(input * rate);
    }, [rate, input])
    const handleChange = (e) => {
        setInput(e.target.value)
        setOutput(e.target.value * rate);
    }
    const firstSelectChange = (e) => {
        setChangeCurrency(e.target.value);
        setRate(arrRates[e.target.value][getCurrency]);
    }
    const renderFirstSelect = () => {
        return Object.keys(arrRates).map((item, index) => { return <option key={index} value={item}>{item}</option> })
    }
    const renderSecondSelect = () => {
        if (Object.keys(arrRates[changeCurrency])[0] !== getCurrency) {
            setGetCurrency(Object.keys(arrRates[changeCurrency])[0])
            setRate(arrRates[changeCurrency][Object.keys(arrRates[changeCurrency])[0]]);
        }
        return Object.keys(arrRates[changeCurrency]).map((item, index) => { return <option key={index} value={item}>{item}</option> })
    }

    const secondSelectChange = (e) => {
        setRate(arrRates[changeCurrency][e.target.value]);

    }


    return (
        <div className="container">
            <div className="row converter">
                <div className="col-4">
                    <p>Change</p>
                    <FormControl onChange={handleChange} value={input} />
                </div>
                <div className="col-1">
                    <select onChange={firstSelectChange}>
                        {renderFirstSelect()}
                    </select>
                </div>
                <div className="col-2">
                    <img src="https://clever-mebel.ru/files/uploads/icon-return.png" className="changebutton" role="button" alt="" />
                </div>

                <div className="col-4">
                    <p>Get</p>
                    <FormControl value={(1 * output).toFixed(5)} disabled />
                </div>
                <div className="col-1">
                    <select onChange={secondSelectChange} >
                        {renderSecondSelect()}
                    </select>
                </div>
            </div>
        </div>
    )

}

export default Converter;