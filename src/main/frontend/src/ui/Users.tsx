import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from "./Wrapper";
import {User} from "../interfaces/user";

const Users = () => {
    const [users, setUsers] = useState([] as User[]);

    
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://172.17.0.1:8080/api/v1/users');

                const data = await response.json();

                console.log(data);
                setUsers(data);
            }
        )();
    }, [])

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://localhost:8080/api/v1/users/${id}`, {
            method: 'DELETE',
            mode: 'no-cors',
        });

            setUsers(users.filter((p: User) => p.id !== id));
        }
    }

    return (
        <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <div className="btn-toolbar mb-2 mb-md-0">
                <Link to="/app/add-user" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope="col">Actiom</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u: User)=> {
                    return (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td className=""><img src={u.imageUrl} className="img-rounded" height="90"/></td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>
                                <div className="align-items-center">
                                    <div className="btn-group">
                                    <Link to={`/app/users/${u.id}/edit`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                       onClick={()=>del(u.id)}>Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
       </Wrapper>
    );
};

export default Users;