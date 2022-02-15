import * as React from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import { MedtronicsIcon } from "../Icons/Icons";
import Navbar from "../Navbar/Navbar"

// layout for all the interfaces
const Layout = ({ children }) => {
	const base = {
		p: "2rem",
	};
	const layoutStyling = {
		overflow: "auto",
		positon: "relative",
	};

	return (
		<Box>
			<Navbar/>
			<Box sx={layoutStyling}>
				{children}
			</Box>
		</Box>
	);
};
export default Layout;
