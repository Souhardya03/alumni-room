"use client";

import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Form, Formik } from "formik";
import { Bed, Calendar } from "lucide-react";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import cookies from "js-cookie"


const images = [
	{
		id: 1,
		link: "/images/test-1.jpg",
	},
	{
		id: 2,
		link: "/images/test-2.jpg",
	},
	{
		id: 3,
		link: "/images/test-3.jpg",
	},
	{
		id: 4,
		link: "/images/test-4.webp",
	},
	{
		id: 5,
		link: "/images/test-5.jpeg",
	},
];

const reviews = [
	{
		name: "Shayan Kundu",
		department: "Computer Science",
		year: 2022,
		review:
			"Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect.",
		rating: 5,
	},
	{
		name: "Aarav Mehta",
		department: "Mechanical Engineering",
		year: 2020,
		review:
			"It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay.",
		rating: 4,
	},
	{
		name: "Sneha Roy",
		department: "Biotechnology",
		year: 2019,
		review:
			"Loved the peaceful environment and how welcoming the staff were. Definitely a must-stay place for visiting alumni.",
		rating: 5,
	},
];



const Page: React.FC = () => {

	
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);
	return (
		<>
			<div className="md:p-18 md:px-36 mt-10">
				<div className="flex p-6 md:p-0 flex-col gap-6">
					<div className="w-fit rounded-full bg-blue-400/60 text-2 px-6 py-2">
						<p className="text-xl font-medium text-white">
							Return to Where It All Began
						</p>
					</div>
					<div className="md:w-2/3 mt-6">
						<p className="md:text-5xl text-3xl playfair md:leading-[56px] font-bold text-white">
							Experience comfort, connection, and nostalgia at our Alumni House
							— your home away from home on campus.
						</p>
					</div>
					<div className="">
						<p className="text-white text-lg">
							Book your stay and rekindle the memories.
						</p>
					</div>
				</div>
				<div className="bg-[#fffc] md:px-8 p-4 py-6 md:flex md:items-center md:justify-between  mt-14 md:w-fit w-full md:rounded-md">
					<Formik
						initialValues={{ type: "", startDate: "", endDate: "" }}
						onSubmit={(values) => console.log(values)}>
						{({ handleChange, setFieldValue }) => {
							return (
								<Form className="">
									<div className="md:flex md:flex-row grid grid-cols-2 flex-col md:justify-between md:gap-4 gap-6 items-center w-full">
										<div className="flex flex-col w-full items-start gap-1">
											<div className="flex justify-center text-[#45464b] font-medium  gap-1 items-center">
												<Bed size={16} />
												<Label>Room Type</Label>
											</div>
											<div className="w-full">
												<Select
													onValueChange={(value) =>
														setFieldValue("type", value)
													}>
													<SelectTrigger className="md:w-[180px] w-full bg-white">
														<SelectValue placeholder="Select room type" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value="AC">AC</SelectItem>
															<SelectItem value="NonAC">Non AC</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="flex flex-col w-full items-start gap-1">
											<div className="flex justify-center text-[#45464b] font-medium gap-1 items-center">
												<Calendar size={16} />
												<Label>Check-in</Label>
											</div>
											<div className="w-full">
												<Input
													name="startDate"
													type="date"
													onChange={handleChange}
													className="bg-white w-full md:w-[180px]"
												/>
											</div>
										</div>
										<div className="flex flex-col items-start gap-1">
											<div className="flex justify-center text-[#45464b] font-medium gap-1 items-center">
												<Calendar size={16} />
												<Label>Check-out</Label>
											</div>
											<div className="w-full">
												<Input
													name="endDate"
													type="date"
													onChange={handleChange}
													className="bg-white w-full md:w-[180px]"
												/>
											</div>
										</div>
										<Button
											className="mt-5 bg-[#333333] px-6 py-5"
											type="submit">
											Search
										</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>

			{/* About kanchenjunga */}
			<div className="bg-[#f5f4f4] flex justify-center md:p-18">
				<div className="bg-white shadow-xl md:w-11/12 p-8 rounded-md">
					<h2 className="md:text-3xl text-2xl font-semibold">Kanchenjunga</h2>
					<div className="text-justify space-y-3 md:w-11/12 text-[#4e4e4e] md:text-lg mt-4">
						<div>
							Kanchenjunga is the brainchild of our own Alumni - the Engineers
							of JGEC, who drive the Industry today. It is meant to facilitate
							students and act as a convention centre. A perfect venue to
							conduct conferences and seminars, meetings, interviews and group
							discussions or to house a start-up. Additionally, this Convention
							centre houses a Reading Corner - a state of the art library of
							fresh books of engineering with latest edition and many relevant
							journals. It also has a facility to lodge people who are
							associated with the facilitation of present students or their
							parents, Alumni or any company/institution representative who have
							arrived to train/interview our students.
						</div>
						<div>
							<h2 className="text-[#454545] text-xl mt-6 mb-3 font-semibold">
								Purspose of Kanchenjunga
							</h2>
							<ul className=" list-disc space-y-2 pl-6">
								<li>
									Kanchenjunga, a Knowledge & Development center shall offer
									Management & Technical Development programs, Seminars,
									Workshops for business houses both public & private
									enterprises & to other non – profit organizations
								</li>
								<li>
									The Industry Achievers shall be invited to address & interact
									with our students , as well.
								</li>
								<li>
									Kanchenjunga shall provide challenges to the loyal exstudents
									of JGEC to deliver lectures on their specialized subject on
									regular basis to the students of their Alma Mater
								</li>
								<li>
									During the lean days of the year when no program, seminar,
									workshops are scheduled, specified rooms of Kanchenjunga shall
									be offered as Transit house to the ex-students during their
									holidays.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Gallery */}
			<div className="md:p-20 p-6 flex justify-center items-center flex-col w-full  bg-white">
				<h2 className="md:text-4xl text-3xl text-center font-semibold">
					Gallery
				</h2>
				<Carousel
					className="w-full mt-6 md:max-w-7xl"
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[plugin.current]}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}>
					<CarouselContent className="-ml-1">
						{images.map((image, index) => (
							<CarouselItem
								key={index}
								className="pl-1 md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<div className=" relative rounded-md h-70 ">
										<Image
											src={image.link}
											alt=""
											className=" absolute rounded-md hover:grayscale-0 duration-200 transition-all grayscale-100"
											objectFit="cover"
											layout="fill"
										/>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="md:flex hidden" />
					<CarouselNext className="md:flex hidden" />
				</Carousel>
			</div>

			{/* Reviews */}
			<div className=" bg-[#f7f7f7] flex flex-col md:p-20 p-4 items-center justify-center">
				<h2 className="md:text-4xl text-3xl playfair">What Our Guests Say</h2>
				<p className="text-[#373737] text-sm md:text-lg mt-2 text-center">
					Hear firsthand from alumni who’ve stayed with us — their stories of
					comfort, connection, and memorable experiences.
				</p>
				<Carousel
					className="w-full mt-10 max-w-6xl"
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[plugin.current]}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}>
					<CarouselContent className="-ml-1">
						{reviews.map((review, index) => (
							<CarouselItem
								key={index}
								className="pl-1 md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<ReviewCard {...review} />
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="md:flex hidden" />
					<CarouselNext className="md:flex hidden" />
				</Carousel>
			</div>
		</>
	);
};

interface Review {
	name: string;
	department: string;
	year: number;
	review: string;
	rating: number;
}

const ReviewCard: React.FC<Review> = ({
	name,
	department,
	year,
	review,
	rating,
}) => {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
			<div className="flex items-center mb-4">
				<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
					{initials}
				</div>
				<div className="ml-4">
					<h3 className="text-lg font-semibold text-gray-700">{name}</h3>
					<p className="text-sm text-gray-500">
						{department} • Batch of {year}
					</p>
				</div>
			</div>

			<div className="flex items-center mb-3">
				{[...Array(5)].map((_, i) => (
					<svg
						key={i}
						className={`w-5 h-5 ${
							i < rating ? "text-yellow-400" : "text-gray-300"
						} fill-current`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20">
						<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
					</svg>
				))}
			</div>

			<p className="text-gray-700 text-justify">{review}</p>
		</div>
	);
};

export default Page;
