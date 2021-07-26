import React, {useEffect, useState} from 'react';
import {Product} from "../interfaces/product";

const Main = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/products`);

                const data = await response.json();
                setProducts(data);
            }
        )();
    }, []);

    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/v1/products/${id}/like`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode:'no-cors'
        });

        window.location.reload();
    }

    return (
        <main>
            <div className="album py-5 bg-light">   
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {products.map(
                            (p:Product) => {
                            return (
                                <div className="col" key={p.id}>
                        <div className="card mb-4 shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>{p.title}</title>
                                <rect width="100%" height="100%" fill="transparent"></rect>
                                <image href={p.image} width="100%" height="100%"></image>
                                </svg>

                            <div className="card-body">
                            <p className="card-text">{p.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => like(p.id)}>Like</button>
                                </div>
                                <small className="text-muted">{p.likes} likes</small>
                            </div>
                            </div>
                        </div>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;