import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { BsFuelPump } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'

const Cart = () => {
    const [cart, setcart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                const po = item.price.replace(' lakh', '')
                total = total + parseInt(po);
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setcart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (err) {
            console.log(err)
        }
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get("https://velocity-vehicles-backend-production.up.railway.app/api/car/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("https://velocity-vehicles-backend-production.up.railway.app/api/car/braintree/payment", {
                nonce,
                cart
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setcart([]);
            navigate("/dashboard/user/order");
            alert("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <div className='marginStyle'>
            <section class="h-100 h-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col">
                            <div class="card">
                                <div class="card-body p-4">
                                    <div class="row">
                                        <div class="col-lg-7">
                                            <h5 class="mb-3">{!auth?.user
                                                ? "Hello Guest"
                                                : `Hello  ${auth?.token && auth?.user?.name}`}
                                            </h5>
                                            <hr />

                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p class="mb-1">Shopping cart</p>
                                                    <p class="mb-0">{cart?.length
                                                        ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                                        }`
                                                        : " Your Cart Is Empty"}
                                                    </p>
                                                </div>
                                            </div>

                                            {cart?.map((p) => (
                                                <div class="card my-3 mb-lg-0">
                                                    <div class="card-body">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <Link to={`/car/${p.slug}`} className='text-center'>
                                                                        <img
                                                                            src={`https://velocity-vehicles-backend-production.up.railway.app/${p.productPictures[0]}`}
                                                                            className="card-img-top"
                                                                            alt={p.name}
                                                                            style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                                                                        />
                                                                    </Link>

                                                                </div>
                                                                <div class="ms-3">
                                                                    <h5>{p.brand.name}</h5>
                                                                    <p class="small mb-0">{p.name}</p>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex flex-row align-items-center">
                                                                <h5 class="fw-normal"><BsFuelPump /> {p.fuelType}</h5>
                                                                <h5 class="mx-3"> ₹ {p.price}</h5>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => removeCartItem(p._id)}
                                                                >
                                                                    <HiOutlineTrash size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div class="col-lg-5">
                                            <div class="card text-white rounded-3" style={{ backgroundColor: 'blueviolet' }}>
                                                <div className='card-body'>
                                                    <div className="text-center">
                                                        <h2>Cart Summary</h2>
                                                        <p>Total | Checkout | Payment</p>
                                                        <hr />
                                                        <h4>Total : {totalPrice()} Lakhs</h4>
                                                        {auth?.user?.address ? (
                                                            <>
                                                                <div className="mb-3">
                                                                    <h4>Current Address</h4>
                                                                    <h5>{auth?.user?.address}</h5>
                                                                    <button
                                                                        className="btn btn-warning my-2"
                                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                                    >
                                                                        Update Address
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="mb-3">
                                                                {auth?.token ? (
                                                                    <button
                                                                        className="btn btn-outline-warning"
                                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                                    >
                                                                        Update Address
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() =>
                                                                            navigate("/login", {
                                                                                state: "/cart",
                                                                            })
                                                                        }
                                                                    >
                                                                        Plase Login to checkout
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="mt-2">
                                                            {!clientToken || !auth?.token || !cart?.length ? (
                                                                ""
                                                            ) : (
                                                                <>
                                                                    <DropIn
                                                                        options={{
                                                                            authorization: clientToken,
                                                                            paypal: {
                                                                                flow: "vault",
                                                                            },
                                                                        }}
                                                                        onInstance={(instance) => setInstance(instance)}
                                                                    />

                                                                    <button
                                                                        className="btn btn-dark mt-3"
                                                                        onClick={handlePayment}
                                                                        disabled={loading || !instance || !auth?.user?.address}
                                                                    >
                                                                        {loading ? "Processing ...." : "Make Payment"}
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Cart
