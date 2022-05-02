import React from 'react';
import json_1 from '../assets/lottie/time_ux.json';
import json_2 from '../assets/lottie/3.json';
import json_3 from "../assets/lottie/4.json";
import json_4 from "../assets/lottie/5.json"
import Lottie from 'react-lottie-player'
;

const Todo = () => {
    return(
        <>
        <section id="main-context">
			<div class="container-fluid">
					<div class="row mt-5">
							<div class="col-12 col-lg-6 d-flex align-items-center text-justify justify-content-center text-uppercase">
								<p className="white_text">
										We'LL send you your eat well box of ingredients This might be as exciting of the class itself. <br /> A few  Days before your class, A  boxed will arrived filled 
									with premium , pre measured ingredients along  with recipes.
									
								</p>	
							</div>
							<div class="col-12 col-lg-6">
								<Lottie loop animationData={json_1} play style={{ width: "150%;", height: "150%;" }} />
							</div>
					</div>
					<div class="row ">
							
							<div class="col-12 col-lg-6">
							<Lottie loop animationData={json_2} play style={{ width: "150%;", height: "150%;" }} />
							</div>
							<div class="col-12 col-lg-6 d-flex align-items-center text-justify justify-content-center text-uppercase">
								<p className="white_text">
										Pick up your fresh ingredients. A shopping list of those <br /> ingredients is emailed to you in advance.
									
								</p>	
							</div>
					</div>
					
			</div>
	  </section>
	 
	  <section id="country">
				<div class="container-fluid">
						<div class="row pt-5 ">
								<div class="col-12 col-lg ml-0 ml-lg-5 pt-5 mt-5">
										<h2 class="text-uppercase white_text">What country do you want to cook with?</h2>
										<p class="mt-4 white_text" >Make sure to select your own timezone and country. <br />
											our chef lives all over the world.
										</p>
								</div>
								<div class="col-12 col-lg">
								<Lottie loop animationData={json_3} play style={{ width: "150%;", height: "150%;" }} />
								</div>
						</div>
						<div class="row py-5">
								
								<div class="col-12 col-lg ">
										<Lottie loop animationData={json_4} play style={{ width: "150%;", height: "150%;" }} />
										{/* <Lottie src={json_4} background="transparent"  speed="1"   style={{width: "100%", height: "100%"}}  loop controls autoplay /> */}
								</div>
								<div class="col-12 col-lg ml-0 ml-lg-5 pt-5 mt-5">
										<h2 class="text-uppercase white_text">You can also create battles</h2>
										<p class="mt-4 white_text"> You can create battles and compete with other chef as a single or by <br /> creating a team. It will help you to skill up your cooking.
										</p>
								</div>
						</div>
						
				</div>
	  </section> 
      </>
    )
}
export default Todo;