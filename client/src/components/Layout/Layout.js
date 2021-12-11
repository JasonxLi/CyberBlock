import * as React from "react";
import { Box, Divider } from "@material-ui/core";
import { MedtronicsIcon } from "../Icons/Icons";

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
		<Box sx={layoutStyling}>
			<Box sx={base}>
				<MedtronicsIcon />
				<Divider />
			</Box>

			{children}
		</Box>
	);
};
export default Layout;
