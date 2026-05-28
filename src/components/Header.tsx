//Formas de usar fragments en React
// import React from "react";
//import { Fragment } from "react";
import logoHeader from '../assets/img/header.png';
import carrito from '../assets/img/carrito.png';
import type { HeaderProps } from "../types/HeaderType.ts";


function Header({cart, removeFromCart, modifyQuantity, removeCart, isEmpty, cartTotal, loadProducts, select, handleSelect}: HeaderProps){
    const getImageUrl = (type: string, image: string) => {
        return new URL(`/src/assets/img/${type}/${image}.jpg`, import.meta.url).href;
    };
    
    return (
        <>
            <header className="header">
                <div className="container-xl">
                    <div className="row justify-content-center justify-content-md-between align-items-center">
                        <div className="col-8 col-md-3">
                            <a href="index.html">
                                <img className="img-fluid" src={logoHeader} alt="imagen logo" />
                            </a>
                        </div>
                        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                            <div className="carrito">
                                <img className="img-fluid" src={carrito} alt="imagen carrito" />

                                <div id="carrito" className="bg-white p-3">
                                    {isEmpty ? <p className="text-center">El carrito esta vacio</p> : <></>}
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((c: any) => {
                                                return (
                                                    <tr key={c._id}>
                                                        <td>
                                                            <img className="img-fluid" src={getImageUrl(c.type, c.image)} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{c.name}</td>
                                                        <td className="fw-bold">{c.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                onClick={() => modifyQuantity(c._id, -1)}
                                                                type="button"
                                                                className="btn btn-dark"
                                                            >
                                                                -
                                                            </button>
                                                            {c.quantity}
                                                            <button
                                                                onClick={() => modifyQuantity(c._id, +1)}
                                                                type="button"
                                                                className="btn btn-dark"
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => removeFromCart(c._id)}
                                                                className="btn btn-danger"
                                                                type="button"
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    {isEmpty ? <></> : <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>}
                                    <button onClick={() => removeCart()} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Barra horizontal de categorías como botones */}
                <div className="header-categories bg-dark py-3">
                    <div className="container-xl d-flex justify-content-center align-items-center gap-3 flex-wrap text-white">
                        <span className="fw-bold fs-4 me-3" style={{ color: '#E89301' }}>¡Lo mejor en tecnología!</span>
                        <button onClick={() =>{loadProducts('headphone'); handleSelect('headphone');}} className="btn btn-outline-light fs-5 px-4 py-2 fw-semibold border-2" style={{minWidth: '130px', color: select == 'headphone' ? '#E89301' : "white"}}>Audífonos</button>
                        <button onClick={() =>{loadProducts('cellphone'); handleSelect('cellphone');}} className="btn btn-outline-light fs-5 px-4 py-2 fw-semibold border-2" style={{minWidth: '130px', color: select == 'cellphone' ? '#E89301' : "white"}}>Celulares</button>
                        <button onClick={() =>{loadProducts('laptop'); handleSelect('laptop');}} className="btn btn-outline-light fs-5 px-4 py-2 fw-semibold border-2" style={{minWidth: '130px', color: select == 'laptop' ? '#E89301' : "white"}}>Laptops</button>
                        <button onClick={() =>{loadProducts('television'); handleSelect('television');}} className="btn btn-outline-light fs-5 px-4 py-2 fw-semibold border-2" style={{minWidth: '130px', color: select == 'television' ? '#E89301' : "white"}}>Televisores</button>
                        <button onClick={() =>{loadProducts('camera'); handleSelect('camera');}} className="btn btn-outline-light fs-5 px-4 py-2 fw-semibold border-2" style={{minWidth: '130px', color: select == 'camera' ? '#E89301' : "white"}}>Cámaras</button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;