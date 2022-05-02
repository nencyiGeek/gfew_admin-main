import React from 'react';
import Fade from 'react-reveal/Fade';
import Lottie from 'react-lottie-player'
import {Button} from "reactstrap"
import trolly from '../../assets/lottie/troll.json';

const Service = () => {
    return(
        <React.Fragment>
          <section className="seo_features_one sec_pad">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-6">
                            <div className="seo_features_img">
                                <Lottie loop animationData={trolly} play style={{ width: "150%;", height: "150%;" }} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Fade bottom cascade>
                                <div className="seo_features_content ">
                                    <h2 className="white_text">Learn new recipes and kitchen skill to up your cooking game.</h2>
                                    <p className="white_text">Reserve your online cooking lession.</p>
                                    <p className="white_text">Browse through all the classes we offer and boo your lession.</p>
                                    <p className="white_text">Make sure to select your own timezone. our chief lives all over the world.</p>
                                    <Button.Ripple className="white_btn">Register</Button.Ripple>
                                   
                                </div>
                            </Fade>
                            
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Service;
