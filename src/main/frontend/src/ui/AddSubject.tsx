import React, {SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from "./Wrapper";
import {Address} from "../interfaces/address";


const AddSubject = () => {
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [firstName, setFirstName ]= useState('');
    const [lastName, setLastName ] = useState('');
    const [password, setPassword ]= useState('');
    const [address, setAddress] = useState({} as Address);
    const [gender, setGender] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [likes, setLikes] = useState("");
    const [token, setToken] = useState("");

    const submit = async (e:SyntheticEvent) => {
          e.preventDefault();

        const response = await fetch('http://localhost:8080/api/v1/registration', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body:JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  image: image,
                  gender: gender,

                  likes: likes
              })
          });

        const data = await response.json();
        setToken(data.token);
        setEmail(data.email);
        console.log(data);
        setRedirect(true);
    }

    if (redirect) {
      return <Redirect  to={'/app/confirm'}/>
    }


    return (
        <Wrapper>
            <section>
    <div className="py-5 text-center">
      <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
      <h2>Create new curriculum</h2>
      <p className="lead">Below is the form for adding a new user.</p>
    </div>

    <div className="row g-5 float-end">
      <div className="col-md-4 col-lg-3 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Preview</span>
          <span className="badge bg-primary rounded-pill">{likes}</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
              <h6 className="my-1">Product title: </h6> 
              <h6 className="text-muted my-1">{email}</h6>
          </li>
          <li className="list-group-item  lh-sm">
            <div>
              <h6 className="my-0">Image</h6>
              <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="true">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect> <text x="35%" y="50%" fill="#eceeef" >Thumbnail</text>
                                <image href={image} width="100%" height="100%"></image>
                                </svg>
                                </div>
              <small className="text-muted">Brief description</small>
            </div>
          </li>
        
          </ul>
      </div>
      <div className="col-md-4 col-lg-5">
        <h4 className="mb-3">User details</h4>
        <form className="needs-validation" noValidate onSubmit={submit}>
          <div className="row g-3">
            

            <div className="col-12">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group has-validation">
                <input type="text" className="form-control" id="username" placeholder="user@name.nl" onChange={e => setEmail(e.target.value)} required/>
              <div className="invalid-feedback">
                  Username is required.
                </div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="image" className="form-label">Profile picture</label>
              <input type="text" className="form-control" id="image" placeholder="Image" onChange={e => setImage(e.target.value)} required/>
            </div>

            <div className="col-12">
              <label htmlFor="desc" className="form-label">Description <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="desc" placeholder="This product displays the moment in history"/>
              <div className="invalid-feedback">
                Please enter a valid description.
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="likes" className="form-label">Likes <span className="text-muted">(Optional)</span></label>
              <input type="number" className="form-control" id="likes" onChange={e => setLikes(e.target.value)} min="0"/>
            </div>
          </div>
          <hr className='my-4'/>
          <div className="card">
            <button className="w-100 btn btn-primary btn-lg" type="submit" >Create user</button>
          </div>
        </form>
      </div>
    </div>
  </section>
       </Wrapper>
    );
};

export default AddSubject;