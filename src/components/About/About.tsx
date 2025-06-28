import Image from "next/image";
import React from "react";

const About = () => {
	return (
		<div className="bg-white text-[#3e3e3e] px-20">
			<div className="flex justify-between lg:mx-10 flex-col lg:items-start">
				<div className="lg:p-8  ">
					<div className=" flex flex-col space-y-7 lg:space-y-14 rounded-md p-4">
						<div className=" p-2 w-full flex flex-col">
							<h2 className="lg:text-2xl md:text-3xl text-lg   font-semibold">
								JALPAIGURI GOVERNMENT ENGINEERING COLLEGE ALUMNI BUILD
								MULTIPURPOSE &quot;KANCHENJUNGA&quot;: A HUB FOR LEARNING,
								COLLABORATION, AND COMMUNITY
							</h2>
							{/* <div className="border-primary w-20 md:w-48 mt-2 border-[2.5px] rounded-full"></div> */}
						</div>
						<div>
							<div className="flex flex-col">
								<h2 className="lg:text-2xl md:text-3xl text-2xl  font-semibold">
									Basic History
								</h2>
							</div>
							<div className="mt-6 text-justify lg:text-lg text-[16px]">
								<div className="text-black flex flex-col gap-3 ">
									<p>
										Kanchenjunga is the brainchild of our own Alumni - the
										Engineers of JGEC, who drive the Industry today. It is meant
										to facilitate students and act as a convention centre. A
										perfect venue to conduct conferences and seminars, meetings,
										interviews and group discussions or to house a start-up.
									</p>
									<p>
										Additionally, this Convention centre houses a Reading Corner
										- a state of the art library of fresh books of engineering
										with latest edition and many relevant journals.
									</p>
									<p>
										It also has a facility to lodge people who are associated
										with the facilitation of present students or their parents,
										Alumni or any company/institution representative who have
										arrived to train/interview our students.
									</p>
								</div>
							</div>
						</div>
						<div className="flex mt-6 flex-col">
							<h2 className="lg:text-3xl md:text-3xl text-2xl  font-semibold">
								Floor Plans
							</h2>

							<div className="mt-8 flex items-center justify-between lg:flex-row flex-col gap-4">
								<Image
									src="/images/Kanchenjunga-floor-plan-1.png"
									alt=""
									height={500}
									width={500}
								/>
								<Image
									src="/images/Kanchenjunga-floor-plan-2.png"
									alt=""
									height={500}
									width={500}
								/>
							</div>
						</div>
						<div className="flex mt-6 flex-col">
							<h2 className="lg:text-3xl md:text-3xl text-2xl  font-semibold">
								Purpose of Kanchenjunga
							</h2>

							<div className="mt-4 bg-white rounded-md flex items-center flex-col-reverse lg:flex-row justify-between gap-4">
								<div className="lg:w-1/2 flex text-justify flex-col gap-4  lg:text-lg text-[16px]">
									<div>
										Kanchenjunga, a Knowledge & Development center shall offer
										Management & Technical Development programs, Seminars,
										Workshops for business houses both public & private
										enterprises & to other non – profit organizations
									</div>
									<div>
										The Industry Achievers shall be invited to address &
										interact with our students , as well.
									</div>
								</div>

								<Image
									src="/images/kanchenjunga-pic-2.png"
									alt=""
									height={500}
									width={500}
									className="rounded-md"
								/>
							</div>
							<div className="mt-6 bg-white rounded-md flex items-center lg:flex-row flex-col justify-between gap-4">
								<Image
									src="/images/kanchenjunga-pic-1.png"
									alt=""
									height={500}
									width={500}
									className="rounded-md"
								/>
								<div className="lg:w-1/2 text-justify flex flex-col gap-4 pr-4 text-[16px] lg:text-lg">
									<div>
										Kanchenjunga shall provide challenges to the loyal
										exstudents of JGEC to deliver lectures on their specialized
										subject on regular basis to the students of their Alma Mater
									</div>
									<div>
										During the lean days of the year when no program, seminar,
										workshops are scheduled, specified rooms of Kanchenjunga
										shall be offered as Transit house to the ex-students during
										their holidays.
									</div>
								</div>
							</div>
						</div>
						<div className="flex mt-6 flex-col">
							<h2 className="lg:text-3xl md:text-3xl text-2xl  font-semibold">
								Promoters of Kanchenjunga
							</h2>

							<div className="mt-4 flex items-center lg:flex-row flex-col justify-between gap-4">
								<Image
									src="/images/kanchenjunga-pic-3.png"
									alt=""
									height={400}
									width={400}
								/>
								<div className="text-center lg:text-xl text-lg font-medium">
									ENGINEERING GRADUATES OF JGEC FROM 1966 – Recently Graduated
									Alumni
								</div>
								<Image
									src="/images/kanchenjunga-pic-4.png"
									alt=""
									height={400}
									width={400}
								/>
							</div>
						</div>
						<div className="flex mt-8 pb-4 flex-col">
							<h2 className="lg:text-3xl md:text-3xl text-2xl  font-semibold">
								Building Features
							</h2>

							<div className="mt-4 text-justify pl-6 lg:text-[16px] text-[16px]">
								<ul className=" list-disc space-y-2">
									<li>One 1044 sq. ft. conference/ seminar hall.</li>
									<li>
										One 1044 sq. ft. development centre where each desk can be a
										work station as well.
									</li>
									<li>
										Around 300 sq. ft. discussion room for small meetings and
										discussions.
									</li>
									<li>Five/ six guest rooms for accommodation.</li>
									<li>One library & reading room.</li>
									<li>Two office room, etc in G+2 building.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
