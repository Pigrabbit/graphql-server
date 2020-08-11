import React from 'react';

export default function Order({ order: { user, orderItem } }) {
    console.log(user, orderItem);

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h5>주문고객: {user.name}</h5>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-secondary">Details</button>
                </div>
            </div>
        </div>
    )
}
