import { HashLink } from "react-router-hash-link";
import { useEffect, useState, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import GymdominatorLogo from "@assets/gym-launch-logo.png";
type colors = "white" | "black";
export const Navbar2 = ({ TextColor }: { TextColor: colors }) => {
	const navigate = useNavigate();
	const [isOpen, SetIsOpen] = useState<boolean>(false);

	return (
		<div className="w-full ">
			<nav
				className={`
         ${
						(TextColor as string) == "white"
							? "text-white bg-black"
							: "text-black bg-white"
					} 
         flex justify-between z-10   h-16 items-center font-overpass font-bold text-lg fixed transition-colors w-full border-b-2 border-gray-100 shadow-xl`}
			>
				<button
					className=" inline-flex items-center "
					onClick={() => {
						navigate("/dashboard/workouts");
					}}
				>
					<div className="inline-flex w-36 h-16 -ml-6 ">
						<img
							className="object-cover mt-1 "
							src={GymdominatorLogo}
							alt="logo"
						/>
						<span className="inline-flex whitespace-nowrap items-center text-2xl font-extrabold relative lg:-left-8 -left-8 font-montserrat top-[1px]">
							GymNavigator
						</span>
					</div>
				</button>
				<div className="gap-20  mr-6  lg:flex hidden text-base font-extrabold *:hover: ">
					<HashLink
						to="/#about-us"
						smooth
						className="border-b-2 border-transparent hover:text-cyan-400 transition-all duration-200 hover:-translate-y-1 hover:shadow-mg "
					>
						About us
					</HashLink>
					<HashLink
						smooth
						to="#contact-us"
						className="border-b-2 border-transparent hover:text-cyan-400 transition-all hover:-translate-y-1 hover:shadow-mg duration-200"
					>
						Contact us
					</HashLink>
					<HashLink
						smooth
						to="/#home"
						className="border-b-2 border-transparent hover:text-cyan-400 transition-all hover:-translate-y-1 hover:shadow-mg duration-200"
					>
						home
					</HashLink>
				</div>
				<div className="md:hidden flex mr-5  ">
					<button
						className="size-10 "
						onClick={() => {
							SetIsOpen((prevState) => !prevState);
						}}
					>
						<svg
							viewBox="0 0 24.00 24.00"
							fill=""
							xmlns="http://www.w3.org/2000/svg"
							stroke="#999999"
						>
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									d="M4 18L20 18"
									stroke="#000000"
									strokeWidth="1.5"
									strokeLinecap="round"
								></path>{" "}
								<path
									d="M4 12L20 12"
									stroke="#000000"
									strokeWidth="1.5"
									strokeLinecap="round"
								></path>{" "}
								<path
									d="M4 6L20 6"
									stroke="#000000"
									strokeWidth="1.5"
									strokeLinecap="round"
								></path>{" "}
							</g>
						</svg>
					</button>
					<div
						className={`${
							isOpen
								? `flex justify-center  text-base whitespace-nowrap   `
								: `hidden`
						}`}
					>
						<SideBar SetIsOpen={SetIsOpen} IsOpen={isOpen} />
					</div>
				</div>
			</nav>
		</div>
	);
};

const SideBar = ({
	SetIsOpen,
	IsOpen,
}: {
	SetIsOpen: Dispatch<React.SetStateAction<boolean>>;
	IsOpen: boolean;
}) => {
	const [isVisible, setVisible] = useState<boolean>(false);
	const [isRotated, setRotated] = useState<boolean>(false);

	useEffect(() => {}, [isRotated]);

	useEffect(() => {
		if (IsOpen) {
			setVisible(true);
			// stop the scroll when the sidebar is opened
			document.body.style.overflow = "hidden";
		} else {
			// scroll start when  the side is closed
			document.body.style.overflow = "unset";
		}
	}, [IsOpen]);

	const handleClose = () => {
		setVisible(false);
		setRotated((prevState) => !prevState);
		setTimeout(() => SetIsOpen(false), 500);
	};

	return (
		<div
			className={`bg-white h-dvh w-[300px] absolute z-30 transition-all duration-500 top-[-10px]  ${
				isVisible ? "left-[0px]" : "left-[-340px]"
			}`}
		>
			<div className="bg-gray-950 w-full h-40  mt-[-4px] flex flex-col justify-center items-center py-2 ">
				<p className="flex mt-4 text-xl text-white">Browse</p>
				<p className="flex font-bold text-2xl text-white ">GymNavigator</p>
			</div>

			<div
				className={`absolute top-8 right-4 transition-all duration-300  ${
					isRotated ? `rotate-0 delay-500` : `-rotate-180`
				}`}
			>
				<button onClick={handleClose} className="w-fit">
					<svg
						fill="#ffffff"
						height="20px"
						width="20px"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 490 490"
						xmlSpace="preserve"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							<polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337"></polygon>
						</g>
					</svg>
				</button>
			</div>
			<div className="flex mt-20 *:text-gray-500 text-xl ">
				<div className="flex flex-col gap-10 w-full *:h-fit *:py-3 *:justify-center *:flex">
					<div className="border-b-2 border-transparent hover:text-blue-600  hover:bg-gray-200 w-full hover:-translate-y-2 transition-transform">
						About us
					</div>
					<div className="border-b-2 border-transparent hover:text-blue-600  hover:bg-gray-200 w-full hover:-translate-y-2 transition-transform">
						Contact us
					</div>
					<div className="border-b-2 border-transparent hover:text-blue-600  hover:bg-gray-200 w-full hover:-translate-y-2  transition-transform">
						Profile
					</div>
				</div>
			</div>
		</div>
	);
};
