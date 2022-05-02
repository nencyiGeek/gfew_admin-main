import React from 'react';
import Lottie from 'react-lottie-player';
import cookingWomen from '../assets/lottie/cookingWomen.json';
import appStoreIcon from '../../../assets/img/gfew_img/appstore.jpg';
const VirtualAssistant = () => {
    return(
           <section id="assistant">
			<div class="container-fluid">
					<div class="row ml-0 ml-lg-5">
							<div class="col-12 col-lg-6">
									<h2 class="text-bold text-center mt-5 py-5 ml-0 ml-lg-5 white_text">OUR VIRTUAL KITCHEN ASSISTANT <br /> WILL HELP YOU PREB</h2>
									<p class="mb-5 white_text">
											We'll send you a notification if you have our app or you <br /> the link to your class. <br /> <br />
											When you check in for your cooking lesson, your Virtual Kitchen <br />
											Assistant will video call you through the platform.Then you'll get <br /> cooking together.
									</p>
									<a href="/landing" class="mb-5 pb-5"><img src={appStoreIcon} class="app_store" alt="appstore" /></a>
							</div>
                            <div class="col-12 col-lg-6">
							 <Lottie loop animationData={cookingWomen} play style={{ width: "150%;", height: "150%;" }} />
                            		
							</div>
					</div>
			</div>
	  </section>
    )
}

export default VirtualAssistant;
