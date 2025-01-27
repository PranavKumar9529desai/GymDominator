import React, { useState } from "react";
import { Container, TextField, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import {
	EnvelopeIcon,
	PhoneIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";

const ContactUs: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const contactInfo = [
		{
			icon: <PhoneIcon className="w-6 h-6" />,
			title: "Phone",
			detail: "+1 (555) 123-4567",
		},
		{
			icon: <EnvelopeIcon className="w-6 h-6" />,
			title: "Email",
			detail: "support@gymnavigator.com",
		},
		{
			icon: <MapPinIcon className="w-6 h-6" />,
			title: "Location",
			detail: "123 Fitness Street, Gym City",
		},
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Add your form submission logic here
		console.log(formData);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
			<Container maxWidth="lg">
				<Box py={8}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-16"
					>
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
							Get in Touch
						</h1>
						<p className="text-gray-300 text-lg max-w-2xl mx-auto">
							Have questions about GymNavigator? We're here to help you get
							started.
						</p>
					</motion.div>

					<div className="grid lg:grid-cols-3 gap-8 mb-12">
						{contactInfo.map((info, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
							>
								<div className="text-blue-400 mb-4">{info.icon}</div>
								<h3 className="text-xl font-semibold text-white mb-2">
									{info.title}
								</h3>
								<p className="text-gray-400">{info.detail}</p>
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-gray-700"
					>
						<Box component="form" onSubmit={handleSubmit}>
							<div className="grid md:grid-cols-2 gap-6 mb-6">
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											"& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
											"&:hover fieldset": {
												borderColor: "rgba(255,255,255,0.3)",
											},
											"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
										},
										"& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
										"& .MuiOutlinedInput-input": { color: "white" },
									}}
								/>
								<TextField
									fullWidth
									label="Email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									required
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											"& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
											"&:hover fieldset": {
												borderColor: "rgba(255,255,255,0.3)",
											},
											"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
										},
										"& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
										"& .MuiOutlinedInput-input": { color: "white" },
									}}
								/>
							</div>
							<TextField
								fullWidth
								label="Subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								variant="outlined"
								sx={{
									marginBottom: 3,
									"& .MuiOutlinedInput-root": {
										"& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
										"&:hover fieldset": {
											borderColor: "rgba(255,255,255,0.3)",
										},
										"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
									},
									"& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
									"& .MuiOutlinedInput-input": { color: "white" },
								}}
							/>
							<TextField
								fullWidth
								label="Message"
								name="message"
								multiline
								rows={4}
								value={formData.message}
								onChange={handleChange}
								required
								variant="outlined"
								sx={{
									marginBottom: 3,
									"& .MuiOutlinedInput-root": {
										"& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
										"&:hover fieldset": {
											borderColor: "rgba(255,255,255,0.3)",
										},
										"&.Mui-focused fieldset": { borderColor: "#3b82f6" },
									},
									"& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
									"& .MuiOutlinedInput-input": { color: "white" },
								}}
							/>
							<Box display="flex" justifyContent="center">
								<Button
									type="submit"
									variant="contained"
									size="large"
									className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg 
                            font-medium hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 
                            transition-all duration-200"
								>
									Send Message
								</Button>
							</Box>
						</Box>
					</motion.div>
				</Box>
			</Container>
		</div>
	);
};

export default ContactUs;
