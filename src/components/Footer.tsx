import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const socialIcons = [
	{
		icon: <FaFacebookF color="#444444"/>,
		link: 'https://www.facebook.com/groups/communicationcell.jgec/'
	},
	{
		icon: <FaLinkedinIn color="#444444"/>,
		link: 'https://www.linkedin.com/company/jgecaa/',
	},
]

const Footer: React.FC = () => {
	return (
		<footer className="w-full h-auto border-t border-t-gray-300 bg-[#eff3fa] pt-8">
			<div className="w-full pb-8 max-w-screen-xl px-4 md:px-10 xl:px-0 mx-auto text-black flex flex-wrap max-sm:flex-col gap-8  justify-between ">
				<div className="flex flex-col  w-full max-w-[15rem] gap-2">
					<Image
						src="/images/Logo.webp"
						width={150}
						height={150}
						alt="logo"
                        className=" drop-shadow-2xl"
					/>
					<div className=" mt-2 text-sm font-semibold text-[#3a3a3a]">
						THE JALPAIGURI
						<div>GOVT.ENGG.COLLEGE ALUMNI</div>
						<div>ASSOCIATION, JALPAIGURI.</div>
					</div>
				</div>
				<div className="flex flex-col lg:p-4">
					<h1 className="text-xl font-semibold text-[#3a3a3a]">Useful Links</h1>
					<div className="flex flex-col mt-2 sm:mt-4  gap-2">
						<Link href="/" className="flex items-center  hover:pl-2 duration-200 cursor-pointer">
							<MdOutlineKeyboardArrowRight size={20} /> Home
						</Link>
						
						<Link href="/assets/constitution_of_AA.pdf" className="flex items-center  hover:pl-2 duration-200 cursor-pointer">
							<MdOutlineKeyboardArrowRight size={20} /> Rooms
						</Link>
						<Link href="/take-a-trip" className="flex items-center  hover:pl-2 duration-200 cursor-pointer">
							<MdOutlineKeyboardArrowRight size={20} /> Main Website
						</Link>
						
					</div>
				</div>
				<div className="flex flex-col lg:p-4">
					<h1 className="text-xl font-semibold text-[#3a3a3a]">Policies</h1>
					<div className="flex flex-col mt-2 sm:mt-4 gap-2 transition-all ease-linear">
						<div className="flex items-center  hover:pl-2 duration-200 cursor-pointer">
							<MdOutlineKeyboardArrowRight size={20} /> Privacy Policy
						</div>
						
						<div className="flex items-center  hover:pl-2 duration-200 cursor-pointer">
							<MdOutlineKeyboardArrowRight size={20} /> Terms & Conditions
						</div>
					</div>
				</div>
				<div className=" flex flex-col gap-2 py-3  lg:p-4 w-full max-w-xs">
					<h1 className="text-xl font-semibold text-[#3a3a3a]">Get In Touch</h1>
					<div className="text-sm mt-1 sm:mt-3">
						Address:{" "}
						<span className="text-[#3a3a3a] ">
							Jalpaiguri Government Engineering College Campus, P.O.: Denguajhar
							Dist.: Jalpaiguri West Bengal - 735102, India.
						</span>
					</div>
					<div className="text-sm">
						<div>Phone : +91 7439428480</div>
						<div>Email : jgecalum@gmail.com</div>
					</div>
					<div className="flex mt-4 gap-4">
						{
							socialIcons.map((ele, i) => (
								<Link key={i} href={ele.link} target="_blank" className="h-10 w-10 border-2 border-[#a8adb6] rounded-md hover:opacity-90 duration-200  flex justify-center items-center text-lg ">
									{ele.icon}
								</Link>
							))
						}
					</div>
				</div>
			</div>
			<div className="flex gap-2 text-xs border-t border-t-gray-300 lg:text-sm  text-black p-4 items-center justify-center ">
				<FaRegCopyright />
				JGEC Alumini Association. All Rights Reserved.
			</div>
		</footer>
	);
};

export default Footer;
