"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
	FaCheckCircle,
	FaShieldAlt,
	FaMapMarkerAlt,
	FaCalendarCheck,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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

const dummyRooms = [
	{
		id: 1,
		title: "Ginger Goa, Panjim",
		location: "Panjim",
		distance: "1.8 km drive to Deltin Royale",
		rating: 4.0,
		reviews: 6386,
		price: 800,
		images: [
			"/images/test-1.jpg",
			"/images/test-2.jpg",
			"/images/test-3.jpg",
			"/images/test-5.jpeg",
		],
	},

];
const RoomDetails = () => {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	const [mainImage, setMainImage] = useState(0);

	return (
		<div className="bg-white py-10 px-4 md:px-40">
			<div className="mb-6">
				<h2 className="text-4xl text-[#434343] playfair">Teesta</h2>
				<div className="flex md:items-center text-gray-500">
					<MdLocationPin className="mt-0.5 md:mt-0" />{" "}
					<p className="text-sm md:text-lg">Kanchenjunga, Jalpaiguri Government Engineering College.</p>
				</div>
			</div>
			{/* Image Gallery */}
			<div className="flex md:flex-row flex-col h-full w-full gap-4">
				<div className="relative md:w-11/12 h-[200px]  md:h-[400px] rounded-xl overflow-hidden">
					<Image
						src={dummyRooms[0].images[mainImage]}
						alt="Main Room"
						fill
						className="object-cover"
					/>
				</div>
				<div className="grid grid-cols-2 w-full md:grid-cols-2 gap-4">
					{dummyRooms[0].images.map((img, i) => (
						<div
							key={i}
							onClick={()=>setMainImage(i)}
							className={`relative w-full h-24 md:h-48 border-2 duration-200 transition-all cursor-pointer  rounded-xl overflow-hidden ${mainImage===i?"border-gray-400 ":" border-transparent"}`}>
							<Image
								src={img}
								alt="Room"
								fill
								className="object-cover"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Description & Booking */}
			<div className="flex flex-col lg:flex-row justify-between mt-14 gap-10">
				{/* Description */}
				<div className="flex-1 space-y-4">
					<h1 className="text-3xl text-[#434343] font-semibold">
						Experience Luxury Like Never Before
					</h1>
					<div className="flex md:gap-6 gap-2 text-sm text-gray-600">
						<p className="flex items-center md:gap-2 gap-1">
							<FaShieldAlt /> Room Service
						</p>
						<p className="flex items-center md:gap-2 gap-1">
							<FaMapMarkerAlt /> Campus View
						</p>
						<p className="flex items-center md:gap-2 gap-1">
							<FaCalendarCheck /> Fast Access
						</p>
					</div>

					{/* Highlights */}
					<ul className="text-gray-700 mt-6 space-y-3 text-sm">
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Clean & Safe
							Stay: A well-sanitized and hygienic space just for you.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Enhanced
							Cleaning: This host follows 5-step enhanced cleaning standards.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Excellent
							Location: 90% of recent guests rated the location 5 stars.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Smooth Check-in:
							100% of guests gave check-in a 5-star rating.
						</li>
					</ul>

					<p className="text-gray-600 mt-4 w-10/12 text-sm">
						Guests will be allocated on the first floor according to
						availability. You get a comfortable bed and convenient access to all
						nearby facilities.
					</p>
				</div>

				{/* Booking Card */}
				<Card className="w-full lg:w-[400px] shadow-xl">
					<CardContent className="p-6 space-y-4">
						<div className="flex gap-1 items-center">
							<p className="text-lg text-[#434343] font-semibold">$399</p>
							<p className="text-sm text-gray-500">/night</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<Input
								type="date"
								placeholder="Check-in"
							/>
							<Input
								type="date"
								placeholder="Check-out"
							/>
						</div>
						<Input
							type="number"
							placeholder="Guests"
							min={1}
						/>
						<Button className="w-full bg-[#333333] text-white">
							Check Availability
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Review */}
			<div className="py-20 flex flex-col  items-center justify-center">
				<h2 className="md:text-4xl text-3xl playfair">What Our Guests Say</h2>
				<p className="text-[#373737] text-sm text-center md:text-lg">
					Hear firsthand from alumni who’ve stayed with us — their stories of
					comfort, connection, and memorable experiences.
				</p>
				<Carousel
					className="w-full mt-10 "
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
					<CarouselPrevious className=" hidden md:flex" />
					<CarouselNext className="md:flex hidden" />
				</Carousel>
			</div>
		</div>
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
		<div className="bg-white rounded-2xl hover:border-gray-400 transition-all duration-200 shadow-md p-6 border border-gray-200">
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

export default RoomDetails;
