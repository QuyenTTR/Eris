import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <NavLink to="/" className="brand-link">
                <img src="/dist/img/logo.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                    style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">Eris Manage</span>
            </NavLink>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/avata.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className=" d-block">Alexander Pierce</a>
                    </div>
                </div>
                <li className="nav-header">QUẢN LÝ</li>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item">
                            <NavLink to="/admin/account" className="nav-link">
                                <i className="fa-solid fa-users-gear mr-2"></i>
                                <p>Tài Khoản</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">
                                <i className="fa-solid fa-box-open mr-2"></i>
                                Sản Phẩm
                                <p>
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/admin/item" className="nav-link">
                                        <i className="fa-solid fa-bowl-food mr-2 ml-2"></i>
                                        <p>Mặt Hàng</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/category" className="nav-link">
                                        <i className="fa-solid fa-list mr-2 ml-2"></i>
                                        <p>Danh Mục</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-circle"></i>
                                <p>
                                    Level 1
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Level 2</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>
                                            Level 2
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon"></i>
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Level 2</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;