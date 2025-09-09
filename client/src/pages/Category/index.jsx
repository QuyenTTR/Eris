import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { api } from "../../routes";

function Category() {

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => handleGetAll(), [])

    function handleGetAll() {
        api.get('/category/getAll')
            .then((res) => {
                if (res.data.status) {
                    setListCategory(res.data.data);
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error("Lỗi server: " + err.message);
            })
    }

    const [infoNew, setInfoNew] = useState({});

    function handleCreate(info) {
        if (!info.name) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        api.post('/category/create', info)
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

    function handleChangeStatus(id) {
        api.put(`/category/updateStatus/${id}`)
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
        api.delete(`/category/delete/${id}`)
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

    return (
        <div className="container">
            <div className="row text-right mb-2">
                <div className="col">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Thêm Danh Mục Mới</button>
                </div>
            </div>
            <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Danh Mục Mới</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Tên Danh Mục</label>
                                <input value={infoNew.name || ""} onChange={e => { setInfoNew(prev => ({ ...prev, name: e.target.value })) }} type="text" className="form-control" placeholder="Nhập tên danh mục" aria-label="Username" aria-describedby="basic-addon1"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button onClick={() => handleCreate(infoNew)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Thêm Mới</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCategory.map((value, key) => {
                            return (
                                <tr key={key} className="text-center">
                                    <td className="align-middle">{key + 1}</td>
                                    <td className="align-middle">{value.name}</td>
                                    <td className="align-middle"><button onClick={() => handleChangeStatus(value._id)} className={`btn btn-${value.isStatus ? 'success' : 'secondary'}`}>{value.isStatus ? 'Khả Dụng' : 'Đã Ẩn'}</button></td>
                                    <td className="align-middle">
                                        <button onClick={() => setIdDelete(value._id)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Bạn Có Chắc Chắn Xóa Danh Mục Này?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => handleDelete(idDelete)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;