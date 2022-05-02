import React from 'react';
// import Fade from 'react-reveal/Fade';
// import Lottie from 'react-lottie-player'
// import {Button} from "reactstrap";
import footerLogo from '../../../assets/img/gfew_img/logo.png';
import white_appstore from '../../../assets/img/gfew_img/white-appstore.png';

const Footer = () => {
    return(
        <footer class="footer_background">
        <div class="container-fluid">
                <div class="row">
                        <div class="col-12 col-lg text-center">
                                <img src={footerLogo} class="footer-logo " alt="footer-logo" />
                                <p class='ml-0 ml-lg-5  text-light '>Learn new recipes and kitchen <br /> skill to up your cooking game.</p>
                        </div>

                        <div class="col-12 col-lg ml-0 ml-lg-5 pl-0 pl-lg-5 text-center">
                            <ul class="mt-5">
                                <li><a href="/page" className="white_text">Pages</a></li>
                                <li><a href="/signup" className="white_text">Sign up</a></li>
                                <li><a href="/login" className="white_text">Login</a></li>
                                <li><a href="/aboutUs" className="white_text">About Us</a></li>
                                <li><a href="/contactUs" className="white_text">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="col-12 col-lg mt-5 ml-0 ml-lg-5 pl-0 pl-lg-5  text-center">
                                <p class="text-light">Social Link</p>
                                <div class="social-icon">
                                    <a href="/facebook"><i class="fab fa-facebook-f"></i></a>
                                    <a href="/twitter"><i class="fab fa-twitter"></i></a>
                                    <a href="/instagram"><i class="fab fa-instagram"></i></a>
                                </div>

                                <a href="/landing"><img src={white_appstore} class="white_appstore mt-3" alt="white-appstore" /></a>
                                
                                
                        </div>
                </div>
        </div>
</footer> 
    )
}

export default Footer;