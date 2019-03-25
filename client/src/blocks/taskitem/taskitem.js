import React from 'react';
import { Icon } from 'react-icons-kit';
import { trashO } from 'react-icons-kit/fa/trashO';
import { eye } from 'react-icons-kit/fa/eye';

const taskitem = ( props ) => {
    return (
        <li data-database-id={ props.id }
            data-database-tags={ props.tags }>
            { props.task }
            <button className="edit fa fa-eye" data-micromodal-trigger="chios__edittaskmicromodal"><Icon icon={ eye } /></button>
            <button onClick={ props.clickDelete } className="delete fa fa-trash" data-micromodal-trigger="chios__deletetaskmicromodal"><Icon icon={ trashO } /></button>
        </li>    
    )
}

export default taskitem;