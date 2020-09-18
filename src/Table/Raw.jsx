import React from 'react';
import "./raw.scss";
const Raw = ({item, handleClick}) => {
    return (
        <tr>
            <td>{item.ccy}/{item.base_ccy}</td>
            <td  className="edit-cell">{item.buy}
            <img src="https://www.materialui.co/materialIcons/image/edit_grey_192x192.png" className="cell-img" alt="" onClick={() => handleClick(item, 'buy')}/>
            </td>
            <td className="edit-cell">{item.sale}
            <img src="https://www.materialui.co/materialIcons/image/edit_grey_192x192.png" className="cell-img" alt="" onClick={() => handleClick(item, 'sale')}/>
            </td>

        </tr>
    )
}
export default Raw;
