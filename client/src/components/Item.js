import React from 'react';

function Item({ item : { name, price } }) {
    // console.log(props.item);
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>{name}</h4>
                </div>
                <div className="col-md-3">
                    <p>{price} 원</p>
                </div>
            </div>
        </div>
    )
}

export default Item;