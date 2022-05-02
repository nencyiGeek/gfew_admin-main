import React from 'react';
// import Fade from 'react-reveal/Fade';
import {Button} from "reactstrap";
import Lottie from 'react-lottie-player';
import trolly from '../assets/lottie/troll.json';
import logo from '../../../assets/img/gfew_img/logo.png';

const NavBar = () => {
    return(
        <React.Fragment>
    <header id="header-section">
        <div class="container-fluid">
        <div class="row">
                <div class="col">
                        <nav class="navbar navbar-expand-lg navbar-dark ">
                                  <a class="navbar-brand" href="/landing"><img src={logo} class="w-100" alt="Logo" /></a>
                                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                  </button>

                                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav ml-auto">
                                      <li class="nav-item active">
                                      <Button.Ripple className="white_btn">Log in</Button.Ripple>
                                      </li>
                                      <li class="nav-item active">
                                     
                                      <Button.Ripple className="white_btn">Sign up</Button.Ripple>
                                      </li>
                                      
                                      
                                    </ul>
                                 
                                  </div>
                        </nav>
                </div>
        </div>
        <div class="row pl-5">
                <div class="col-12 col-lg-6">
                        <div class="header-left-panel">
                                <h1 class="text-light mb-3">
                                        Learn new recipes and kitchen skill to up your cooking game.
                                </h1>
                                <p class="text-light">Reserve your online cooking lession. <br /> Browse through all the classes we offer and boo your lession. <br /> Make sure to select your own timezone. our chief lives all over the world. </p>
                        </div>
                        <Button.Ripple className="white_btn">Register</Button.Ripple>
                </div>
                <div class="col-12 col-lg-6">
                <Lottie loop animationData={trolly} play style={{ width: "150%;", height: "150%;" }} />
                    </div>
        </div>
</div>			
</header>
        </React.Fragment>
    )
}

export default NavBar;