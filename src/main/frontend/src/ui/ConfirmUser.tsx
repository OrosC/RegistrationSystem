import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { Product } from '../interfaces/product';
import Wrapper from "./Wrapper";
import {Address} from "../interfaces/address";


const ConfirmUser = (props: PropsWithRef<any>) => {
    const [email, setEmail] = useState('');

    const [redirect, setRedirect] = useState(false);


    setEmail(props.match.params.token);

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8080/api/v1/registration/confirm?token=${props.match.params.token}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/app/users'}/>
    }


    return (
        <Wrapper>
            <section>
                <div className="py-5 text-center">
                    <form className="needs-validation" noValidate onSubmit={submit}>
                    {email}
                    </form>
                </div>
            </section>
        </Wrapper>
    )
};

export default ConfirmUser;