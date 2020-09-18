import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import "./table.scss";
import Raw from "./Raw";
import EditWindow from './editwindow';
import Converter from '../Converter/Converter'



const Table1 = () => {
    const [data, setData] = useState('');
    const [modal, setModal] = useState(false);
    const [obj, setObj] = useState();
    const [key, setKey] = useState();
   
 
    useEffect(() => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(response => response.json())
            .then(res => {
                setData(res);
            });
    }, [])

    

    const closeModal = () => {
        setModal(false);
    }


    const saveModal = (value, item, operation) => {

        let index = data.findIndex((f) => f.ccy === item.ccy);
        if (data[index][operation] * 1.1 > value * 1 && data[index][operation] * 0.9 < value) { data[index][operation] = value;}
        
        else
            alert('error');
        closeModal();
    }
    const handleClick = (raw, type) => {
        setKey(type);
        setObj(raw);
        setModal(true);
    }
    const renderTable = () => {
        return data.map((element, index) => <Raw handleClick={handleClick} item={element} key={index} />);
    }

    return (
        <div className="container tablesection">
            <Table bordered hover className="table container " >
                <thead>
                    <tr>
                        <th>Currency/Current</th>
                        <th>Buy</th>
                        <th>Sale</th>

                    </tr>
                </thead>
                <tbody>
                    {data ? renderTable() : null}
                </tbody>
            </Table>
            <div className="modalwindow">
                {modal ? <EditWindow item={obj} typeoperation={key} modalclose={closeModal} modalsave={saveModal} /> : null}
            </div>
            {data ? <Converter curData={data} /> : null}
        </div>
    )
}

export default Table1;