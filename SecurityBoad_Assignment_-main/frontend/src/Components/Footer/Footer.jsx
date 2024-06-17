import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <footer className="py-3 my-4" style={{ backgroundColor: 'black', color: 'white' }}>
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <Link to='/' className="nav-link px-2" style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/ticket' className="nav-link px-2" style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>
                            Ticket
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/food' className="nav-link px-2" style={{ color: 'white', fontSize: '20px', fontWeight: '500' }}>
                            Food Order
                        </Link>
                    </li>
                </ul>
                <p className="text-center" style={{ color: 'white' }}>© 2021 Company, Inc. All rights reserved.</p>
                <ul className="list-unstyled d-flex justify-content-center">
                    <li className="ms-3">
                        <a className="link-light" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a>
                    </li>
                    <li className="ms-3">
                        <a className="link-light" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a>
                    </li>
                    <li className="ms-3">
                        <a className="link-light" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;
