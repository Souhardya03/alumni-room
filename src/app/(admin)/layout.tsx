"use client";

import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiHome } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdEventNote, MdFolder } from "react-icons/md";
import { Button } from "@/components/ui/button";

const navItems = [
	{ name: "Dashboard", path: "/admin", icon: <TiHome size={22} /> },
	{ name: "Rooms", path: "/admin/rooms", icon: <IoIosCreate size={20} /> },
	{ name: "Bookings", path: "/admin/bookings", icon: <IoSchool size={20} /> },
	{ name: "Users", path: "/admin/users", icon: <FaUser size={16} /> },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return (
		<>
			<div className="w-full bg-white/90">
				<SidebarProvider>
					<Sidebar className="shadow-xl h-full z-30 bg-[#ffffff]">
						<SidebarContent className="h-full">
							<SidebarGroup>
								<SidebarGroupLabel className="my-4">
									<div className="flex gap-1 my-2 items-center">
										<div className="line-clamp-1 text-base text-neutral-950">
											Jgec Alumni Admin
										</div>
									</div>
								</SidebarGroupLabel>
								<SidebarGroupContent className="mt-14 h-full p-4 ">
									<SidebarMenu className="space-y-6 h-full">
										<div className="flex flex-col justify-between h-[60vh]">
											<div className="flex flex-col justify-evenly h-full">
												{navItems.map((item) => (
													<SidebarMenuItem key={item.name}>
														<SidebarMenuButton asChild>
															<Link
																href={item.path}
																className={`flex  duration-200 justify-between items-center`}>
																<span className={`text-[16px] ${
																		pathname === item.path
																			? "text-[#d43c3c] font-semibold"
																			: "text-gray-600 duration-200"
																	} `}>{item.name}</span>
																<span
																	className={`${
																		pathname === item.path
																			? "text-[#d43c3c]"
																			: "text-gray-400 duration-200"
																	} `}>
																	{item.icon}
																</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												))}
											</div>
											
										</div>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarTrigger />
					<nav className="w-full fixed  z-20 ">
						<div className=" shadow-md z-20 flex justify-end items-center h-[10vh] w-full bg-white pr-4 space-x-3 lg:space-x-8 top-0">
							<div className="flex justify-center items-center gap-1">
								<div className="text-sm font-medium">Admin</div>
							</div>
							{/* <button
						className="bg-danger flex items-center justify-center gap-2 p-2 px-4 text-white rounded text-sm disabled:opacity-50"
						onClick={async () => await logout()}
						disabled={isLoading}>
						<div>Logout</div>
						{!isLoading ? (
							<FiLogOut />
						) : (
							<Loader2
								className="animate-spin"
								size={16}
							/>
						)}
					</button> */}
						</div>
					</nav>
					<div className=" w-full mt-14 z-10 h-screen lg:max-h-fit top-16 lg:p-8 p-4 text-black">
						{children}
					</div>
					{children}
				</SidebarProvider>
			</div>
		</>
	);
};

export default Layout;
