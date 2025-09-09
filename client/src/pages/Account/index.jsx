import { useState, useEffect } from "react";

import { api } from '../../routes';
import { data } from "react-router-dom";

function Account() {

    const [listAccount, setListAccount] = useState([]);

    useEffect(() => {
        handleGetAll();
    }, [])

    function handleGetAll() {
        api.get('/account/getAll')
            .then((res) => {
                if (res.data.status) {
                    setListAccount(res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    return (<>
        <div className="row text-right mb-2">
            <div className="col">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Thêm Danh Mục Mới</button>
            </div>
        </div>
        <div className="card">
            <div className="card-body pt-3 pl-3 pr-3 pb-0">
                <div className="row">
                    {listAccount.map((value, key) => {
                        return (
                            <div key={key} className="col-3">
                                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
                                            <img src={`http://localhost:3000${value.avatar}`} className="img-fluid rounded-circle" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body pl-0">
                                                <h5 className="card-title mb-2"><b>{value.name}</b></h5>
                                                <p className="card-text">Email: {value.email}</p>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                                <p className="card-text"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>);
}

export default Account;