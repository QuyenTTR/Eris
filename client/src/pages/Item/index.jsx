import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { api } from '../../routes';

function Item() {

    const [listItem, setListItems] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        handleGetAll();
        handleGetCategories()
    }, []);

    function handleGetAll() {
        api.get('/item/getAll')
            .then((res) => {
                if (res.data.status) {
                    setListItems(res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    function handleGetCategories() {
        api.get('/category/getAll', {
            params: {
                isStatus: 1
            }
        })
            .then((res) => {
                if (res.data.status) {
                    setListCategory(res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    const [infoNew, setInfoNew] = useState({})

    function handleCreate(info) {
        if (!info.name || !info.price || !info.image || !info.categoryId) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append("name", info.name);
        formData.append("price", info.price);
        formData.append("image", info.image);
        formData.append("categoryId", info.categoryId);

        api.post("/item/create", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                if (res.data.status) {
                    handleGetAll();
                    toast.success(res.data.message);
                    setInfoNew({})
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            });
    }


    const [infoUpdate, setInfoUpdate] = useState({});

    function handleUpdate(info) {

        const formData = new FormData();
        if (info.name) formData.append("name", info.name);
        if (info.price) formData.append("price", info.price);
        if (info.image) formData.append("image", info.image);
        if (info.quantityLeft) formData.append("quantityLeft", info.quantityLeft);

        api.put(`/item/update/${info._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                if (res.data.status) {
                    handleGetAll();
                    toast.success(res.data.message);
                    setInfoUpdate({});
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    function handleChangeStatus(id) {
        api.put(`/item/updateStatus/${id}`)
            .then((res) => {
                if (res.data.status) {
                    handleGetAll();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    const [idDelete, setIdDelete] = useState(null);

    function handleDelete(id) {
        api.delete(`/item/delete/${id}`)
            .then((res) => {
                if (res.data.status) {
                    handleGetAll();
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    return (<>
        <div className="text-right mb-3">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Thêm Mặt Hàng Mới</button>
        </div>

        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-header">Search</div>
                    <div className="card-body">Body</div>
                </div>
            </div>
            <div className="col-9">
                {
                    listCategory.map((v, k) => {
                        return (
                            <div key={k} className="card">
                                <div className="card-body pt-3 pl-3 pr-3 pb-0">
                                    <h4>{v.name}</h4>
                                    <div className="row p-0">
                                        {listItem.length > 0 ? listItem.filter((item) => { return item.categoryId === v._id }).map((value, key) => {
                                            return (
                                                <div className="col-2" key={key}>
                                                    <div className="card mb-3">
                                                        <img className="card-img-top" src={`http://localhost:3000${value.image}`} style={{ aspectRatio: "1.5 / 1", objectFit: "cover" }} />
                                                        <div className="pd-10 p-3 card-body">
                                                            <p className='mb-0' style={{ lineHeight: "1.2em", minHeight: "2.4em" }}>
                                                                <b className='text-primary'>[{value.quantityLeft}]</b> {value.name}
                                                            </p>
                                                            {value.price.toLocaleString('vi-VN')}₫
                                                            <button onClick={() => { handleChangeStatus(value._id) }} className={`w-100 btn btn-${value.isStatus ? "success" : "secondary"}`}>{`${value.isStatus ? "Đang Bán" : "Đã Ẩn"}`}</button>
                                                            <div className="text-nowrap text-center mt-1 row g-1">
                                                                <div className="col-6">
                                                                    <button onClick={() => setInfoUpdate(value)} className="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal"><i className="fa-solid fa-pen-to-square"></i></button>
                                                                </div>
                                                                <div className="col-6">
                                                                    <button onClick={() => setIdDelete(value._id)} className="btn w-100 btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fa-solid fa-trash"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <div className='col-12 text-center'>Chưa Có Dữ Liệu? <a href="" data-bs-toggle="modal" data-bs-target="#createModal">Thêm Mới</a> Xem Sao</div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Mặt Hàng Mới</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Tên Mặt Hàng</label>
                            <input value={infoNew.name || ""} onChange={e => { setInfoNew(prev => ({ ...prev, name: e.target.value })) }} type="text" className="form-control" placeholder="Nhập tên mặt hàng" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Hình Ảnh</label>
                            <input onChange={e => { setInfoNew(prev => ({ ...prev, image: e.target.files[0] })) }} type="file" className="form-control"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Giá</label>
                            <input value={infoNew.price || ""} onChange={e => { setInfoNew(prev => ({ ...prev, price: e.target.value })) }} type="number" className="form-control" placeholder="Nhập giá mặt hàng" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleSelect" className="form-label">Danh Mục</label>
                            <select value={infoNew.categoryId || ""} onChange={e => setInfoNew(prev => ({ ...prev, categoryId: e.target.value }))} className="form-select" id="exampleSelect">
                                <option>-- Chọn danh mục --</option>
                                {
                                    listCategory.map((value, key) => {
                                        return (
                                            <option key={key} value={value._id}>{value.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button onClick={() => handleCreate(infoNew)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Thêm Mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cập Nhật Mặt Hàng</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Tên Mặt Hàng</label>
                            <input value={infoUpdate.name || ""} onChange={e => { setInfoUpdate(prev => ({ ...prev, name: e.target.value })) }} type="text" className="form-control" placeholder="Nhập tên mặt hàng" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Hình Ảnh</label>
                            <input onChange={e => { setInfoUpdate(prev => ({ ...prev, image: e.target.files[0] })) }} type="file" className="form-control"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Giá</label>
                            <input value={infoUpdate.price || ""} onChange={e => { setInfoUpdate(prev => ({ ...prev, price: e.target.value })) }} type="number" className="form-control" placeholder="Nhập giá mặt hàng" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Số Lượng Còn Lại</label>
                            <input value={infoUpdate.quantityLeft || ""} onChange={e => { setInfoUpdate(prev => ({ ...prev, quantityLeft: e.target.value })) }} type="number" className="form-control" placeholder="Nhập số lượng" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => setInfoUpdate({})} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button onClick={() => handleUpdate(infoUpdate)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Bạn Có Chắc Chắn Xóa Mặt Hàng Này?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => handleDelete(idDelete)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Item;