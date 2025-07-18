"use client";

import React, { useEffect, useState } from "react";
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
import {
	useCheckAvailabilityMutation,
	useCreateBookingMutation,
	useGetListingByIdQuery,
} from "@/store/features/rooms";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2, UserCheck } from "lucide-react";
import { useAuth } from "@/store/AuthContext";
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";

const dummyRooms = [
	{
		id: 1,
		title: "Executive Suite - Teesta",
		location: "Kanchenjunga Block A",
		distance: "Ground Floor",
		rating: 4.8,
		reviews: 245,
		price: 1200,
		images: [
			"/images/test-1.jpg",
			"/images/test-2.jpg",
			"/images/test-3.jpg",
			"/images/test-5.jpeg",
		],
	},
];

// const reviews = [
// 	{
// 		name: "Shayan Kundu",
// 		department: "Computer Science",
// 		year: 2022,
// 		review:
// 			"Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect. The room was spotless and the amenities exceeded my expectations.",
// 		rating: 5,
// 		avatar: "/images/reviewer-1.jpg",
// 		stayDate: "December 2023",
// 	},
// 	{
// 		name: "Aarav Mehta",
// 		department: "Mechanical Engineering",
// 		year: 2020,
// 		review:
// 			"It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay. The staff was incredibly helpful and friendly.",
// 		rating: 4,
// 		avatar: "/images/reviewer-2.jpg",
// 		stayDate: "November 2023",
// 	},
// 	{
// 		name: "Sneha Roy",
// 		department: "Biotechnology",
// 		year: 2019,
// 		review:
// 			"Loved the peaceful environment and how welcoming the staff were. Definitely a must-stay place for visiting alumni. The breakfast was delicious and the room service was prompt.",
// 		rating: 5,
// 		avatar: "/images/reviewer-3.jpg",
// 		stayDate: "October 2023",
// 	},
// ];

interface RoomDetailsProps {
	params: Promise<{ id: string }>;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
	params,
}: RoomDetailsProps) => {
	const { id } = React.use(params);
	const { data } = useGetListingByIdQuery({ id });
	const room = data?.data;
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	const [mainImage, setMainImage] = useState(0);
	const [isRoomAvailable, setIsRoomAvailable] = useState(false);
	const [totalCost, setTotalCost] = useState(0);

	const [
		checkAvailable,
		{
			isError: isAvailabilityError,
			error: availabilityError,
			isLoading: isAvailabilityLoading,
		},
	] = useCheckAvailabilityMutation();

	const calculateNights = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diff = endDate.getTime() - startDate.getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	};

	const formik = useFormik({
		initialValues: {
			startDate: "",
			endDate: "",
			guests: 1,
			type: "",
			purpose: "",
		},
		onSubmit: async (values) => {
			const res = await checkAvailable({ ...values, id }).unwrap();
			if (res.success) {
				toast.success(res.message);
				setIsRoomAvailable(true);

				const nights = calculateNights(values.startDate, values.endDate);
				let pricePerNight =
					values.guests === 1 ? room?.singleOccupancy : room?.doubleOccupancy;

				if (nights > 0 && pricePerNight) {
					setTotalCost(nights * pricePerNight);
				} else {
					setTotalCost(0);
				}
			}
		},
	});

	const calculateTotalCost = (values: typeof formik.values) => {
		const nights = calculateNights(values.startDate, values.endDate);
		if (nights <= 0) return setTotalCost(0);

		let basePrice = 0;
		let extraCharge = 0;

		if (values.purpose === "Campus_Recruitment") {
			basePrice = 500;
		} else {
			basePrice =
				values.guests === 1
					? room?.singleOccupancy ?? 0
					: room?.doubleOccupancy ?? 0;
			if (values.type === "AC") {
				extraCharge = values.guests === 1 ? 400 * nights : 500 * nights;
			}
		}

		const cost = basePrice * nights + extraCharge;
		setTotalCost(cost);
	};

	const [
		createBooking,
		{
			isError: isCreateBookingError,
			error: createBookingError,
			isLoading: isCreateBookingLoading,
		},
	] = useCreateBookingMutation();

	const { refetch } = useAuth();

	const handleSubmit = async (values: any) => {
		const data = { ...values, total: totalCost };
		const res = await createBooking({ id, data }).unwrap();
		if (res.success) {
			toast.success(res.message);
			refetch();
		}
	};

	useEffect(() => {
		if (isAvailabilityError) {
			toast.error(
				(availabilityError as any).data.message ||
					"Failed to check availability"
			);
		}
		if (isCreateBookingError) {
			toast.error(
				(createBookingError as any).data.message || "Failed to create booking"
			);
		}
	}, [
		isAvailabilityError,
		availabilityError,
		isCreateBookingError,
		createBookingError,
	]);

	const reviews: any = data?.data.reviews || [];

	if (!room) {
		return <Loader />;
	}

	return (
		<div className="bg-white py-28 px-4 md:px-40">
			{/* Title & Location */}
			<div className="mb-6">
				<h2 className="text-4xl text-[#434343] playfair">{room?.title}</h2>
				<div className="flex md:items-center text-gray-500">
					<MdLocationPin className="mt-0.5 md:mt-0" />
					<p className="text-sm md:text-lg">Kanchenjunga, JGEC</p>
				</div>
			</div>

			{/* Image Gallery */}
			<div className="flex md:flex-row flex-col gap-4">
				<div className="relative md:w-11/12 h-[200px] md:h-[400px] rounded-xl overflow-hidden">
					<Image
						src={`http://localhost:5000${room?.images[mainImage].url}`}
						alt="Main Room"
						fill
						className="object-cover"
					/>
				</div>
				<div className="grid w-full  grid-cols-2 gap-4">
					{room.images.map((img, i) => (
						<div
							key={i}
							onClick={() => setMainImage(i)}
							className={`relative h-24 md:h-48 rounded-xl overflow-hidden border-2 cursor-pointer ${
								mainImage === i ? "border-gray-400" : "border-transparent"
							}`}>
							<Image
								src={`http://localhost:5000${img.url}`}
								alt="Room"
								fill
								className="object-cover"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Description and Booking */}
			<div className="flex flex-col lg:flex-row justify-between mt-14 gap-10">
				{/* Description */}
				<div className="flex-1 space-y-4">
					<h1 className="text-3xl text-[#434343] font-semibold">
						Experience Luxury, Relive Memories, Stay Connected — Alumni House.
					</h1>
					<div className="flex gap-4 text-sm text-gray-600">
						<p className="flex items-center gap-1">
							<FaShieldAlt /> Room Service
						</p>
						<p className="flex items-center gap-1">
							<FaMapMarkerAlt /> Campus View
						</p>
						<p className="flex items-center gap-1">
							<FaCalendarCheck /> Fast Access
						</p>
					</div>

					{/* Highlights */}
					<ul className="text-[16px] text-gray-700 space-y-3 mt-6">
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Stay: A
							well-sanitized and hygienic space just for you.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Enhanced
							Cleaning: This host follows 5-step enhanced cleaning standards.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> Location: 90% of
							recent guests rated the location 5 stars.
						</li>
						<li className="flex items-start gap-2">
							<FaCheckCircle className="text-green-600 mt-1" /> 100% of guests
							gave check-in a 5-star rating.
						</li>
					</ul>
				</div>

				{/* Booking Form */}
				<Card className="w-full lg:w-[400px] shadow-xl">
					<CardContent className="p-6 space-y-4">
						<div>
							<div className="flex gap-1 items-center">
								<p className="text-lg font-semibold text-[#434343]">
									₹{room?.singleOccupancy}
								</p>
								<p className="text-sm text-gray-500">per night</p>
							</div>
							<p className="text-sm text-gray-400">
								Double: ₹{room?.doubleOccupancy}
							</p>
						</div>

						<form className="space-y-3">
							<div
								className={`grid grid-cols-2 gap-3 ${
									isRoomAvailable ? "hidden" : ""
								}`}>
								<div>
									<Label className="mb-1">Check In</Label>
									<Input
										type="date"
										name="startDate"
										className="w-full rounded-xl border-gray-200 focus:border-purple-500"
										value={formik.values.startDate}
										onChange={formik.handleChange}
									/>
								</div>
								<div>
									<Label className="mb-1">Check Out</Label>
									<Input
										type="date"
										name="endDate"
										className="w-full rounded-xl border-gray-200 focus:border-purple-500"
										value={formik.values.endDate}
										onChange={formik.handleChange}
									/>
								</div>
							</div>
							<div>
								<Label className="mb-1">Guests (Max 2)</Label>
								<Input
									type="number"
									name="guests"
									min={1}
									max={2}
									className="w-full rounded-xl border-gray-200 focus:border-purple-500"
									value={formik.values.guests}
									onChange={(e) => {
										formik.handleChange(e);
										calculateTotalCost({
											...formik.values,
											guests: parseInt(e.target.value),
										});
									}}
								/>
							</div>
							<div className={!isRoomAvailable ? "hidden w-full" : "w-full"}>
								<Label className="mb-1">Room Type</Label>
								<Select
									value={formik.values.type}
									onValueChange={(value) => {
										formik.setFieldValue("type", value);
										calculateTotalCost({ ...formik.values, type: value });
									}}>
									<SelectTrigger className="h-12 w-full rounded-xl border-gray-200 focus:border-purple-500">
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
							<div className={!isRoomAvailable ? "hidden w-full" : "w-full"}>
								<Label className="mb-1">Purpose</Label>
								<Select
									value={formik.values.purpose}
									onValueChange={(value) => {
										formik.setFieldValue("purpose", value);
										calculateTotalCost({ ...formik.values, purpose: value });
									}}>
									<SelectTrigger className="h-12 w-full rounded-xl border-gray-200 focus:border-purple-500">
										<SelectValue placeholder="Select purpose for booking" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Personal">Personal</SelectItem>
											<SelectItem value="Campus_Recruitment">
												Campus Recruitment
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div>
								{isRoomAvailable && totalCost > 0 && (
									<p className="text-md font-medium text-gray-800">
										Total Cost: ₹{totalCost}
									</p>
								)}
							</div>

							{isRoomAvailable ? (
								<Button
									type="button"
									disabled={isCreateBookingLoading}
									onClick={() => {
										handleSubmit(formik.values);
									}}
									className="w-full bg-[#333333] text-white">
									{isCreateBookingLoading ? (
										<>
											<Loader2 className="animate-spin" /> Booking
										</>
									) : (
										"Book Now"
									)}
								</Button>
							) : (
								<Button
									onClick={(e) => {
										e.preventDefault(), formik.handleSubmit();
									}}
									className="w-full bg-[#333333] text-white"
									disabled={isAvailabilityLoading}>
									{isAvailabilityLoading ? "Checking..." : "Check Availability"}
								</Button>
							)}
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Reviews */}
			<div className="pt-20 flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl playfair">What Our Guests Say</h2>
				<p className="text-sm md:text-lg text-[#373737] text-center">
					Hear firsthand from alumni who've stayed with us.
				</p>
				{reviews?<Carousel
					className="w-full mt-10"
					opts={{ align: "start", loop: true }}
					plugins={[plugin.current]}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}>
					<CarouselContent className="-ml-1">
						{reviews &&
							reviews.map((review: any, index: any) => (
								<CarouselItem
									key={index}
									className="pl-1 md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<ReviewCard {...review} />
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex" />
					<CarouselNext className="hidden md:flex" />
				</Carousel>:
				<div className="mt-14">No reviews posted yet.</div>
				}
				
			</div>
		</div>
	);
};

interface Review {
	user: {
		name: string;
		role: string;
	};
	content: string;
	rating: number;
}

const ReviewCard: React.FC<Review> = ({ user, content, rating }) => {
	const initials = user.name
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
					<h3 className="text-lg font-semibold text-gray-700">{user.name}</h3>
					<Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
						<UserCheck className="w-3 h-3 mr-1" />
						{user.role
							? user.role.charAt(0).toUpperCase() +
							  user.role.slice(1).toLowerCase()
							: ""}
					</Badge>
				</div>
			</div>

			<div className="flex items-center mb-3">
				{[...Array(5)].map((_, i) => (
					<svg
						key={i}
						className={`w-5 h-5 ${
							i < rating ? "text-yellow-400" : "text-gray-300"
						} fill-current`}
						viewBox="0 0 20 20">
						<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
					</svg>
				))}
			</div>

			<p className="text-gray-700 text-justify">{content}</p>
		</div>
	);
};

export default RoomDetails;
