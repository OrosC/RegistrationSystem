import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <section id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link to="/users" className="nav-link active" aria-current="page">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span data-feather="file"></span>
                        Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span data-feather="shopping-cart"></span>
                        Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span data-feather="users"></span>
                        Customers
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span data-feather="bar-chart-2"></span>
                        Reports
                      </a>
                    </li>
                   </ul>
                </div>
              </section>          
    );
};

export default Menu;