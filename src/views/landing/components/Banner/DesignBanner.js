import React from 'react';
import  how_it_work from '../../../../assets/img/gfew_img/how-it-works_1.png';
import  how_it_works_chef from  '../../../../assets/img/gfew_img/how-it-works_1-chef.png';
import  skill_1 from '../../../../assets/img/gfew_img/1_1.jpg';
import  skill_2 from '../../../../assets/img/gfew_img/1_2.jpg';
import  skill_3  from '../../../../assets/img/gfew_img/1_3.jpg';
import  skill_4  from '../../../../assets/img/gfew_img/1_4.jpg';
import how_it_works_1_register from  '../../../../assets/img/gfew_img/how-it-works_1-register.png';

const DesignBanner = () => {
    return(
        <section className="seo_home_area">
			<div class="container-fluid">
					<div class="row">
							<div class="col text-center">
									<div class="team-build-wrapper mt-5 text-center mt-5">
										<h2 class="d-inline-block">Corporate Wellness -  </h2> <span>Team Building</span>
									</div>
							</div>
					</div>
					<div class="row mt-5">
							<div class="col d-flex justify-content-center justify-content-lg-end hide">
									<img src={how_it_work} alt="how-it-works_1" />
                                    
							</div>
							<div class="col text-center text-lg-left">
									<img src={how_it_works_chef} alt="how-it-works_1-chef" />
							</div>
					</div>
					<div class="row">
							<div class="col text-center">
									
									<h1 class="d-inline-block mt-5 heading-1">How it works</h1>
									
									<p class="text-center mt-4 ">Learn new recipes and kitchen skills to up your cooking game. <br /> Post your creations to chef
									and instagram to earn badges, XP and engage with the community.</p>
							</div>
					</div>
					
					<div class="row my-3 text-center">
							<div class="col">
									<img src={skill_1}  alt="1.1" />
									<p class="text-center">Learn Culinary Skills and Earn Badges</p>
							</div>
							<div class="col">
										<img src={skill_2} alt="1.2" />
									<p class="text-center">Add Recipes to Meal Planner and Make Your First Meal</p>
							</div>
							<div class="col">
									<img src={skill_3} alt="1.3" />
									<p class="text-center">Upload Food Pics, Rate Photos</p>
							</div>
							<div class="col">
									<img src={skill_4} alt="1.4" />
									<p class="text-center">Earn Prizes</p>
							</div>
					</div>
					<div class="row">
							<div class="col text-center">
									<h2>Your Digital Health Plan</h2>
									<div class="reg mt-3">
											<a href="/register">
												<img src={how_it_works_1_register} style={{width : "25% !important"}} class="d-inline-w-100" alt="how-it-works_1-register" /></a>
									</div> <br />
									
									<span>www.getfiteatwell.com/register</span> 
							</div>
					</div>
			</div>
	</section>
    )
}
export default DesignBanner;
