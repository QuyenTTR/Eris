import './AdminLayout.scss';
import './AdminLteStyle/plugins/jquery/jquery.min.js';
import './AdminLteStyle/plugins/bootstrap/js/bootstrap.bundle.min.js';
import './AdminLteStyle/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js';
import './AdminLteStyle/dist/js/adminlte.min.js';

import Navbar from './Navbar';

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default AdminLayout;
