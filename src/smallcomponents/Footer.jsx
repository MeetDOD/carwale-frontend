import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <br /><br />
            <br /><br />
            <br /><br />
            <footer class="bg-dark text-white pt-5 pb-4 ">
                <div class="container text-center text-md-left">
                    <div class="row text-center text-md-left">
                        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-warning fs-3">Velocity Vehicals</h5>
                            <p>Velocity Vehicals is an online platform to buy the cars in online method.its become easy to purcase caarsnof different brands with their respective models at one place</p>
                        </div>


                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Useful links</h5>
                            <p>
                                <Link to='/' class="text-white" style={{ textDecoration: "none" }} >Home</Link>
                            </p>
                            <p>
                                <Link to='/about' class="text-white" style={{ textDecoration: "none" }} >About</Link>
                            </p>
                            <p>
                                <Link to="/dashboard/user" class="text-white" style={{ textDecoration: "none" }}>Dashboard</Link>
                            </p>
                            <p>
                                <Link to="/cart" class="text-white" style={{ textDecoration: "none" }} >My Cart</Link>
                            </p>

                        </div>
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
                            <p>
                                <i class="fas fa-home mr-3 px-2"></i><a class="text-white" style={{ textDecoration: "none" }}>Vcet,Vasai(West)</a>
                            </p>
                            <p>
                                <i class="fas fa-envelope mr-3 px-2"></i><a class="text-white" style={{ textDecoration: "none" }}>Velocity Vehicals2023@gmail.com</a>
                            </p>
                            <p>
                                <i class="fas fa-phone mr-3 px-2"></i><a class="text-white" style={{ textDecoration: "none" }}>+91 1223434569</a>
                            </p>
                            <p>
                                <i class="fas fa-print mr-3 px-2"></i><a class="text-white" style={{ textDecoration: "none" }}>+01 223 232 34</a>
                            </p>
                        </div>
                    </div>
                    <div class="row align-item-center justify-content-center">
                        <div class="col-md-7 col-lg-8">
                            <p>Copyright &copy;2023 All rights resrved by :
                                <a href="#" style={{ textDecoration: "none" }}>
                                    <strong class="text-warning"> Velocity Vehicals</strong>
                                </a>
                            </p>
                        </div>
                        <div class="align-item-inline">
                            <i class="fab fa-facebook fa-2x px-3 hoverLink" ><a href=""></a></i>
                            <i class="fab fa-linkedin fa-2x px-3 hoverLink"><a href=""></a></i>
                            <i class="fab fa-twitter fa-2x px-3 hoverLink"><a href=""></a></i>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
