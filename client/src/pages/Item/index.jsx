import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Item() {

    const [listItem, setListItems] = useState([]);

    useEffect(() => {
        handleGetItems();
    }, []);

    function handleGetItems() {
        axios.get('http://localhost:3000/api/item/getAll')
            .then((res) => {
                if (res.data.status) {
                    setListItems(res.data.data);
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    function handleChangeStatus(id) {
        axios.put(`http://localhost:3000/api/item/updateStatus/${id}`)
            .then((res) => {
                if (res.data.status) {
                    handleGetItems();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    function handleDeleteItem(id) {
        axios.delete(`http://localhost:3000/api/item/delete/${id}`)
            .then((res) => {
                if (res.data.status) {
                    handleGetItems();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    return (
        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-header">Search</div>
                    <div className="card-body">Body</div>
                </div>
            </div>
            <div className="col-9">
                <div className="card">
                    <div className="card-header row">
                        <div className="col-6">
                            <h3>Danh Mục</h3>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-primary">Thêm Mặt Hàng Mới</button>
                        </div>
                    </div>
                </div>

                <div className="table">
                    <div className="card">
                        <div className="card-header">
                            AAAA
                        </div>
                        <div className="card-body row">
                            {listItem.map((value, key) => {
                                return (
                                    <div className="card col-2 p-1 ml-1 mr-1" key={key}>
                                        <img className="card-img-top" src={`/dist/img/${value.image}`} style={{ aspectRatio: "1.5 / 1", objectFit: "cover" }} />
                                        <div className="pd-10 card-body">
                                            <p>
                                                <b className='text-primary'>[{value.quantityLeft}]</b> {value.name}
                                            </p>
                                            {value.price.toLocaleString('vi-VN')}₫
                                            <button onClick={() => { handleChangeStatus(value._id) }} className={`w-100 btn btn-${value.isStatus ? "success" : "secondary"}`}>{`${value.isStatus ? "Đang Bán" : "Đã Ẩn"}`}</button>
                                            <div className="text-nowrap text-center mt-1 row g-1">
                                                <div className="col-6">
                                                    <button className="btn w-100 btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn w-100 btn-danger"><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;