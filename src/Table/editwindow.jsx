import React, { useState } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

const EditWindow = ({ item, typeoperation, modalclose, modalsave }) => {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <Modal.Dialog>
            <Modal.Body>
                <p>{item.ccy}-{typeoperation}</p>
                <p>{(item[typeoperation] * 0.9).toFixed(5)}-{(item[typeoperation] * 1.1).toFixed(5)}</p>
                <FormControl onChange={handleChange}/>
                <Button variant="primary" onClick={() => modalsave(value, item, typeoperation)}>Save changes</Button>
                <Button variant="secondary" onClick={modalclose}>Cancel</Button>
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default EditWindow;