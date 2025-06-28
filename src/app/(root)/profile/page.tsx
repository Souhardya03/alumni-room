"use client";
import { useAuth } from "@/store/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdHotel } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon, Loader2 } from "lucide-react";
import { useLogoutMutation, useUpdateProfileMutation } from "@/store/baseApi";
import { toast } from "sonner";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tabs = [
	{
		id: 1,
		name: "My Profile",
		icons: <CgProfile size={22} />,
	},
	{
		id: 2,
		name: "My Bookings",
		icons: <MdHotel size={22} />,
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

const dummyRooms = [
	{
		id: 1,
		title: "Ginger Goa, Panjim",
		location: "Panjim",
		distance: "1.8 km drive to Deltin Royale",
		rating: 4.0,
		reviews: 6386,
		price: 800,
		startDate: "2025-06-20",
		endDate: "2025-06-23",
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
		startDate: "2025-06-10",
		endDate: "2025-06-13",
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
		startDate: "2025-06-25",
		endDate: "2025-06-27",
		images: [
			"/images/test-1.jpg",
			"/images/test-2.jpg",
			"/images/test-3.jpg",
			"/images/test-5.jpeg",
		],
	},
];

const Page = () => {
	const { data,refetch } = useAuth();
	const formRef = useRef<HTMLFormElement>(null);

	const [
		update,
		{ isError: isUpdateError, error: updateError, isLoading: isUpdateLoading },
	] = useUpdateProfileMutation();
	const [show, setShow] = useState(1);
	const [open, setOpen] = useState<boolean>(false);
	const [logout, { isError, error }] = useLogoutMutation();

	const handleLogout = async () => {
		const res = await logout();
		if (res.data?.success) {
			toast.success(res.data.message);
		}
	};

	const handleSubmit = async(values:any)=>{
		console.log(values);
		
		const res = await update(values);
		if(res.data?.success){
			toast.success(res.data.message)
			refetch();
		}
	}

	useEffect(() => {
		if (isError) {
			toast.error(
				(error as { data?: { message?: string } })?.data?.message ||
					"Failed to Logout"
			);
		}
	}, [error, isError]);

	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	return (
		<>
			<div className="md:p-24 p-3 text-[#464646] flex items-center justify-center bg-[#f4f3f3">
				<div className="shadow-md  rounded-xl  w-full  md:max-w-7xl">
					<div className="flex md:flex-row flex-col  gap-2">
						<div className="border-r p-3  md:h-[65vh] bg-white rounded-xl md:rounded-l-xl border-r-gray-300 w-full flex justify-between md:flex-col items-center md:items-start flex-row md:w-[30%] ">
							<h3 className="text-sm md:text-lg md:block hidden">My Account</h3>
							<div className="md:mt-[4em] flex flex-row md:items-start items-center justify-center w-full md:flex-col gap-4">
								{tabs.map((tab) => (
									<div
										key={tab.id}
										onClick={() => setShow(tab.id)}
										className={`${
											tab.id === show ? "bg-blue-100" : ""
										} flex items-center md:w-full gap-3 p-3 cursor-pointer  rounded-md`}>
										{tab.icons}
										<p className={`text-[14px] md:block ${tab.id==show?"block":"hidden"} `}>{tab.name}</p>
									</div>
								))}
							</div>
							<div className="border  border-gray-300 h-[6vh] md:h-0 md:w-full md:my-14"></div>
							<div className="flex md:flex-col flex-row">
								<div
									onClick={() => setOpen(!open)}
									className="flex  items-center gap-3 p-3">
									<MdLockReset size={22} />
									<p className="cursor-pointer md:block hidden">Reset Password</p>
								</div>
								<div
									onClick={handleLogout}
									className="flex items-center gap-3 p-3 ">
									<IoMdLogOut
										size={22}
										color="red"
									/>
									<p className="text-red-500 cursor-pointer md:block hidden">Logout</p>
								</div>
							</div>
						</div>

						<div className="md:h-[80vh] no-scrollbar overflow-y-scroll overflow-x-hidden  w-full rounded-xl md:rounded-r-xl bg-white">
							<div className={`${show === 1 ? "block" : "hidden"} `}>
								<div
									className={`border-b p-4 flex justify-between items-center border-b-gray-300`}>
									<h3>My Profile</h3>
									<Button type="submit" onClick={() => formRef.current?.requestSubmit()} className="bg-blue-500 px-6 hover:bg-blue-600 cursor-pointer">
										Save
									</Button>
								</div>
								<div className="p-6">
									<h2 className="italic">
										Welcome{" "}
										<span className="font-semibold italic">
											{data?.data.name}
										</span>
									</h2>
									<div className="mt-8">
										<Formik
											enableReinitialize={true}
											initialValues={{
												email: data?.data.email || "",
												phone: data?.data.phone || "",
												name: data?.data.name || "",
											}}
											// validationSchema={AuthSchema}
											validateOnChange={true}
											onSubmit={(values: any) => {handleSubmit(values)}}>
											{({ handleChange, values }) => {
												return (
													<Form ref={formRef}>
														<div className="grid md:grid-cols-2 gap-4">
															<div className="grid gap-2">
																<Label htmlFor="email">Email</Label>

																<Input
																	id="email"
																	name="email"
																	onChange={handleChange}
																	value={values.email}
																	type="email"
																	placeholder="example@gmail.com"
																	className="bg-[#f9f9f9c3]"
																/>

																<ErrorMessage
																	className="text-red-500 text-sm"
																	component={"div"}
																	name={"email"}
																/>
															</div>
															<div className="gap-2 grid">
																<Label htmlFor="phone">Phone No.</Label>

																<Input
																	id="phone"
																	name="phone"
																	onChange={handleChange}
																	value={values.phone}
																	type="number"
																	placeholder="xxxxxxxxxx"
																	className="bg-[#f9f9f9c3]"
																/>

																<ErrorMessage
																	className="text-red-500 text-sm"
																	component={"div"}
																	name={"phone"}
																/>
															</div>
															<div className="gap-2 grid">
																<Label htmlFor="name">Name</Label>

																<Input
																	id="name"
																	name="name"
																	onChange={handleChange}
																	value={values.name}
																	type="text"
																	placeholder="Name"
																	className="bg-[#f9f9f9c3]"
																/>

																<ErrorMessage
																	className="text-red-500 text-sm"
																	component={"div"}
																	name={"name"}
																/>
															</div>
														</div>

														{/*  */}
													</Form>
												);
											}}
										</Formik>
										<div className="border border-gray-300 w-full my-8"></div>
										{/* My Reviews */}
										<div>
											<h2 className="font-semibold">My Reviews</h2>
											<div>
												<Carousel
													className="w-full mt-5 max-w-6xl"
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
										</div>
									</div>
								</div>
							</div>
							<div className={` ${show === 2 ? "block" : "hidden"} `}>
								<div
									className={`border-b p-4 flex
									justify-between items-center border-b-gray-300`}>
									<h3>My Bookings</h3>
								</div>
								<div className="md:my-8 my-4 p-2 md:px-6 flex flex-col gap-6">
									{dummyRooms.map((room, index) => (
										<HotelCard
											key={index}
											{...room}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ResetPassword
				open={open}
				closed={() => setOpen(false)}
			/>
		</>
	);
};

export const ResetPassword = ({
	open,
	closed,
}: {
	open: boolean;
	closed: () => void;
}) => {
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showPassValid, setShowPassValid] = useState<boolean>(false);
	const [updatePass, { isError, error, isLoading }] =
		useUpdateProfileMutation();

	const handleSubmit = async (values: any) => {
		const res = await updatePass(values);
		if (res.data?.success) {
			toast.success(res.data.message);
			closed();
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(
				(error as { data?: { message?: string } })?.data?.message ||
					"Failed to update password"
			);
		}
	}, [isError, error]);

	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={closed}>
				<DialogContent className="sm:max-w-[425px] bg-slate-200/95">
					<DialogHeader>
						<DialogTitle className="text-center text-xl">
							Reset Password
						</DialogTitle>
						<DialogDescription className="text-center text-black/80">
							Reset your password from here.
						</DialogDescription>
					</DialogHeader>

					<Formik
						initialValues={{
							password: "",
						}}
						// validationSchema={AuthSchema}
						validateOnChange={true}
						onSubmit={(values: any) => {
							const passwordChecks = [
								values.password.length >= 8,
								/[A-Z]/.test(values.password),
								/[a-z]/.test(values.password),
								/[0-9]/.test(values.password),
								/[!@#$%^&*]/.test(values.password),
							];

							const allValid = passwordChecks.every((rule) => rule);
							if (!allValid) {
								toast.warning("Password does not meet all requirements.");
								return;
							}

							handleSubmit(values);
						}}>
						{({ handleChange, values }) => {
							const passwordRules = [
								{
									label: "At least 8 characters",
									valid: values.password.length >= 8,
								},
								{
									label: "At least one uppercase letter",
									valid: /[A-Z]/.test(values.password),
								},
								{
									label: "At least one lowercase letter",
									valid: /[a-z]/.test(values.password),
								},
								{
									label: "At least one digit",
									valid: /[0-9]/.test(values.password),
								},
								{
									label: "At least one special character (!@#$%^&*)",
									valid: /[!@#$%^&*]/.test(values.password),
								},
							];

							return (
								<Form>
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="password">Password</Label>
											<div
												className="flex transition-all duration-200 rounded-md"
												onClick={() => setShowPassValid(true)}>
												<Input
													id="password"
													name="password"
													onChange={handleChange}
													value={values.password}
													type={showPass ? "text" : "password"}
													placeholder="*******"
													className="rounded-r-none bg-[#eeececc3]"
												/>
												<div className="bg-[#eeececc3] rounded-r-md pr-4 flex items-center justify-center cursor-pointer">
													{showPass ? (
														<Eye
															size={18}
															color="#555555e6"
															onClick={() => setShowPass(false)}
														/>
													) : (
														<EyeOffIcon
															size={18}
															color="#555555e6"
															onClick={() => setShowPass(true)}
														/>
													)}
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="w-2/3">
													<ErrorMessage
														className="text-red-500 text-sm"
														component={"div"}
														name={"password"}
													/>
												</div>
											</div>

											<div
												className={`grid gap-1 text-sm mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
													showPassValid
														? "max-h-64 opacity-100 mb-4"
														: "max-h-0 opacity-0"
												}`}>
												{passwordRules.map((rule, index) => (
													<div
														key={index}
														className="flex items-center gap-2">
														<span
															className={
																rule.valid ? "text-green-600" : "text-red-500"
															}>
															{rule.valid ? "✅" : "❌"}
														</span>
														<span
															className={
																rule.valid ? "text-green-700" : "text-gray-700"
															}>
															{rule.label}
														</span>
													</div>
												))}
											</div>
										</div>
									</div>

									<DialogFooter className="mt-3">
										<Button
											className="w-full flex items-center justify-center gap-2"
											type="submit"
											disabled={isLoading}>
											{isLoading && (
												<Loader2
													size={16}
													className="animate-spin"
												/>
											)}
											Change Password
										</Button>
									</DialogFooter>
								</Form>
							);
						}}
					</Formik>
				</DialogContent>
			</Dialog>
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

export const ReviewCard: React.FC<Review> = ({
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
				<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
					{initials}
				</div>
				<div className="ml-4">
					<h3 className="text-[14px] font-semibold text-gray-700">{name}</h3>
					<p className="text-[12px] text-gray-500">
						{department} • Batch of {year}
					</p>
				</div>
			</div>

			<div className="flex items-center mb-3">
				{[...Array(5)].map((_, i) => (
					<svg
						key={i}
						className={`w-4 h-4 ${
							i < rating ? "text-yellow-400" : "text-gray-300"
						} fill-current`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20">
						<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
					</svg>
				))}
			</div>

			<p className="text-gray-700 text-[14px] text-justify">{review}</p>
		</div>
	);
};

interface HotelCardProps {
	id: number;
	title: string;
	location: string;
	distance: string;
	rating: number;
	reviews: number;
	price: number;
	images: string[];
	startDate: string;
	endDate: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
	id,
	title,
	location,
	distance,
	rating,
	reviews,
	price,
	images,
	startDate,
	endDate,
}) => {
	const [mainImage, setMainImage] = useState(images[0]);

	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);

	let statusBadge = (
		<Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-blue-200 mt-2">
			Upcoming
		</Badge>
	);

	if (now > end) {
		statusBadge = (
			<Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-green-300 mt-2">
				Completed
			</Badge>
		);
	} else if (now >= start && now <= end) {
		statusBadge = (
			<Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-yellow-300 mt-2">
				Ongoing
			</Badge>
		);
	}

	return (
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
								className={`relative md:w-16 md:h-12 w-12 h-12 cursor-pointer border-2 ${
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
			</div>

			{/* Divider */}
			<div className="border hidden md:block md:absolute md:h-full h-[10em] right-[12.5em] md:right-[16em] md:top-0 bottom-0 border-gray-200"></div>
			<div className="flex md:w-2/3 justify-between ">
				<div className="flex flex-col justify-between gap-2">
					<div>
						<Link href={`/rooms/${id}`}>
							<h2 className=" text-xl cursor-pointer font-semibold text-black">
								{title}
							</h2>
						</Link>
						<p className="md:text-sm text-xs text-gray-600 mt-2">
							<span className="text-[#484848] font-semibold">{location}</span> |{" "}
							{distance}
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
						<p className="text-lg font-medium text-black">
							Total: &#8377; {price}
						</p>
					</div>
					{statusBadge}
				</div>
			</div>
		</div>
	);
};



export default Page;
