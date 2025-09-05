import { Outlet, useMatches } from 'react-router-dom'

import PreLoader from './PreLoader'
import Header from './Header';
import Sidebar from './Sidebar';

function DefaultLayout() {
    const matches = useMatches();
    // lấy title của route cuối cùng match
    const title = matches[matches.length - 1]?.handle?.title || "Default";

    return (

        <div className="wrapper">
            <PreLoader />
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">{title}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">{title}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content p-4">
                    <Outlet />
                </section>
            </div>

        </div>
    );
}

export default DefaultLayout;