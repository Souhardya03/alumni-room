"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AuthModal } from "./Modals/AuthModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify, Loader2 } from "lucide-react";
import { Drawer, DrawerContent } from "./ui/drawer";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "@/store/AuthContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { useLogoutMutation } from "@/store/baseApi";
import { toast } from "sonner";

const NavBar: React.FC = () => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const [changeBack, setChangeBack] = useState(pathname !== "/");
	const [openDrawer, setOpenDrawer] = useState(false);
	const { token, data, refreshTokenFromCookie } = useAuth();
	const [logout, { isLoading}] = useLogoutMutation();
	const NavLinks = [
		{ name: "Home", link: "/" },
		{ name: "Rooms", link: "/rooms" },
		{ name: "About", link: "/about" },
		...(data?.data?.role === "ADMIN"
			? [{ name: "Admin", link: "/admin" }]
			: []),
	];

	useEffect(() => {
		if (pathname === "/") {
			const change = () => {
				setChangeBack(window.scrollY > 10);
			};
			window.addEventListener("scroll", change);
			setChangeBack(window.scrollY > 10);
			return () => window.removeEventListener("scroll", change);
		} else {
			setChangeBack(true);
		}
	}, [pathname]);

	const handleLogout = async () => {
		const res = await logout();
		if (res) {
			toast.success("Logout Successfull");
		}
		refreshTokenFromCookie();
	};

	return (
		<>
			<div
				className={`z-10 ${
					changeBack
						? "bg-white/98 text-[#434343] shadow-lg"
						: "bg-transparent text-white"
				} duration-200 transition-all sticky flex items-center justify-center top-0`}>
				<div className="flex z-10 justify-between w-full md:w-10/12 items-center px-8 p-5">
					<div className="text-2xl font-semibold">Kanchenjunga</div>
					<div className=" md:flex hidden space-x-14">
						{NavLinks.map((nav, index) => (
							<div
								key={index}
								className="group relative cursor-pointer">
								<Link
									href={nav.link}
									className={`${
										pathname === nav.link ? "font-bold" : ""
									} group-hover:font-bold transition-all duration-75`}>
									{nav.name}
								</Link>
								<div
									className={`border absolute -bottom-1 w-0 duration-200 transition-all group-hover:w-full ${
										pathname === nav.link
											? `w-full ${
													changeBack ? "border-[#434343]" : "border-white"
											  }`
											: "border-transparent"
									} group-hover:border-white`}></div>
							</div>
						))}
					</div>
					{token ? (
						<HoverCard>
							<HoverCardTrigger asChild>
								<Avatar className="cursor-pointer ring-2 ring-muted hover:ring-primary transition">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</HoverCardTrigger>

							<HoverCardContent className="w-64 p-4 rounded-xl shadow-xl border bg-background">
								<div className="flex flex-col gap-4">
									{/* User Info */}
									<div className="flex items-center gap-3">
										<Avatar className="w-10 h-10">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-semibold">{data?.data.name}</p>
											<p className="text-xs text-muted-foreground">
												{data?.data.email}
											</p>
										</div>
									</div>

									<div className="border-t border border-gray-200" />

									{/* Action Links */}
									<div className="flex flex-col gap-3">
										<Link
											href={"/profile"}
											className="flex items-center gap-2 text-sm hover:text-primary transition">
											<CgProfile className="text-base" />
											Profile
										</Link>
										<button
											onClick={handleLogout}
											className="flex items-center cursor-pointer gap-2 text-sm hover:text-red-500 transition">
											{isLoading ? (
												<Loader2
													className="animate-spin text-base"
													size={16}
												/>
											) : (
												<IoExitOutline className="text-base" />
											)}
											Logout
										</button>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>
					) : (
						<Button
							className="text-[16px]  hidden cursor-pointer bg-[#333333] md:flex items-center justify-center px-6 py-5"
							onClick={() => setOpen(!open)}>
							Login
						</Button>
					)}

					<Button
						onClick={() => setOpenDrawer(!openDrawer)}
						className="md:hidden bg-[#333333] block">
						<AlignJustify />
					</Button>
				</div>
			</div>
			{/* <div className="border border-[#ffffff21]"></div> */}
			{open && (
				<AuthModal
					open={open}
					closed={() => setOpen(false)}
				/>
			)}

			<Drawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				direction="left">
				<DrawerContent className="block lg:hidden p-0 bg-slate-100 text-[#333333] h-full w-[80%]">
					<div className="p-6 flex items-center justify-between border-b border-gray-600">
						<h2 className="text-2xl font-semibold tracking-wide">
							Kanchenjunga
						</h2>
						<Button
							className="bg-[#333333] text-white "
							onClick={() => setOpenDrawer(false)}>
							<RxCross2 size={24} />
						</Button>
					</div>

					<div className="flex flex-col px-6 py-10 gap-8 overflow-y-auto">
						{NavLinks.map((nav, index) => (
							<Link
								key={index}
								href={nav.link}
								onClick={() => setOpenDrawer(false)}
								className={`text-lg px-4 py-2 rounded-md transition-all duration-200 ${
									pathname === nav.link
										? "bg-white text-black font-semibold shadow-xl"
										: "hover:bg-gray-200"
								}`}>
								{nav.name}
							</Link>
						))}

						<hr className="border-t border-gray-600 my-4" />

						<Button
							onClick={() => {
								// handle login or open login modal
								setOpen(!open);
								setOpenDrawer(false);
							}}
							className=" text-white bg-gray-700 shadow-lg font-semibold rounded-lg py-2">
							Login
						</Button>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavBar;
