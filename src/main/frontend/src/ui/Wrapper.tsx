import React, {PropsWithChildren} from 'react';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Users from "./Users";

const Wrapper = (props: PropsWithChildren<any>) => {
    return (
         <section>
             <div className="container-fluid">
                <div className="row">
                  <Menu />
                  <main className="bg-light col-md-9 ms-sm-auto col-lg-10 px-md-4 pb-3">
                    {props.children}
                  </main>
                </div>
            </div>
         </section>
    );
};

export default Wrapper;