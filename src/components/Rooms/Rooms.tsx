"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useAuth } from "@/store/AuthContext";
import { AuthModal } from "../Modals/AuthModal";
interface HotelCardProps {
	id: number;
	title: string;
	location: string;
	distance: string;
	rating: number;
	reviews: number;
	price: number;
	images: string[];
}
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
	{
		id: 2,
		title: "Hotel Orchid Retreat",
		location: "Siliguri",
		distance: "0.5 km from City Center",
		rating: 4.5,
		reviews: 4502,
		price: 950,
		images: [
			"/images/test-1.jpg",
			"/images/test-2.jpg",
			"/images/test-3.jpg",
			"/images/test-5.jpeg",
		],
	},
	{
		id: 3,
		title: "Alumni Guest House",
		location: "Campus North",
		distance: "Inside Campus",
		rating: 4.2,
		reviews: 2134,
		price: 700,
		images: [
			"/images/test-1.jpg",
			"/images/test-2.jpg",
			"/images/test-3.jpg",
			"/images/test-5.jpeg",
		],
	},
	// Add more if needed
];

const HotelCard: React.FC<HotelCardProps> = ({
	id,
	title,
	location,
	distance,
	rating,
	reviews,
	price,
	images,
}) => {
	const [mainImage, setMainImage] = useState(images[0]);
	const { token } = useAuth();
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="flex flex-col relative md:flex-row  rounded-lg shadow-md border-2 hover:border-gray-400 duration-200 transition-all p-4 gap-4 bg-white w-full max-w-5xl">
				{/* Main Image */}
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex gap-2 flex-col">
						<div className="relative h-50 md:h-40 rounded-md overflow-hidden">
							<Image
								src={mainImage}
								alt="Hotel"
								fill
								className="object-cover rounded-md"
							/>
						</div>

						<div className="flex gap-2 flex-wrap">
							{images.map((img, index) => (
								<div
									key={index}
									className={`relative md:w-16 md:h-12 w-16 h-16 cursor-pointer border-2 ${
										mainImage === img ? "border-blue-500" : "border-transparent"
									} rounded-md`}
									onClick={() => setMainImage(img)}>
									<Image
										src={img}
										alt={`sub-${index}`}
										fill
										className="object-cover rounded-md"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Hotel Info */}
				</div>

				{/* Divider */}
				<div className="border hidden md:block md:absolute md:h-full h-[10em] right-[12.5em] md:right-[16em] md:top-0 bottom-0 border-gray-200"></div>
				<div className="flex md:w-2/3 justify-between ">
					<div className="flex flex-col justify-between gap-2">
						<div>
							<Link href={`/rooms/${id}`}>
								<h2 className="md:text-2xl text-xl cursor-pointer font-semibold text-black">
									{title}
								</h2>
							</Link>
							<p className="md:text-sm text-xs text-gray-600 mt-2">
								<span className="text-[#484848] font-semibold">{location}</span>{" "}
								| {distance}
							</p>
							<Badge className="bg-gray-100 text-gray-700 text-xs mt-2">
								Couple Friendly
							</Badge>
						</div>

						<div className="md:text-sm text-xs text-[#484848] mt-2 flex flex-col gap-1">
							<p>🧺 Complimentary Meal Included</p>
							<p>🍳 Breakfast Included</p>
						</div>
					</div>

					{/* Rating & Price */}
					<div className="flex flex-col justify-between items-end text-right min-w-[140px]">
						<div className="space-y-1">
							<p className="text-[#484848] text-sm font-semibold">
								Very Good{" "}
								<span className="bg-[#484848] text-white text-xs px-2 py-1 rounded-md ml-1">
									{rating}
								</span>
							</p>
							<p className="text-xs text-gray-500">({reviews} Ratings)</p>
						</div>
						<div>
							<p className="text-xl font-bold text-black">&#8377; {price}</p>
							<p className="text-xs text-gray-500">+ ₹ 468 taxes & fees</p>
							<p className="text-xs text-gray-600 mt-1">Per Night</p>
						</div>

						{token ? (
							<Button
								variant="link"
								className="bg-[#484848] text-white cursor-pointer text-xs h-auto">
								<Link href={`/rooms/${id}`}>Book Now</Link>
							</Button>
						) : (
							<Button
								variant="link"
								className="bg-[#484848] text-white cursor-pointer text-xs h-auto"
								onClick={() => setOpen(true)}>
								Login to Book Now
							</Button>
						)}
					</div>
				</div>
			</div>
			{open && (
				<AuthModal
					open={open}
					closed={() => setOpen(false)}
				/>
			)}
		</>
	);
};

const Rooms: React.FC = () => {
	return (
		<>
			<div className="md:p-8 p-2 md:px-36 bg-[#f3f2f3]">
				<h2 className="text-3xl md:text-4xl text-[#373737] font-bold">
					Kanchenjunga Rooms
				</h2>
				<p className="w-full md:w-1/2 mt-2 text-gray-700 text-sm">
					Enjoy a peaceful and comfortable stay in our well-furnished alumni
					rooms — thoughtfully designed to offer the perfect blend of nostalgia,
					convenience, and homely warmth during your visit to campus.
				</p>

				{/* Grid Layout for Room Cards */}
				<div className="my-8 flex flex-col gap-6">
					{dummyRooms.map((room, index) => (
						<HotelCard
							key={index}
							{...room}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Rooms;
