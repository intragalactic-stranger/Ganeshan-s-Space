"use client";

import React from "react";

// Placeholder component (previous file was empty and triggered hook lint error due to likely stale compiled code)
// Replace or extend with actual orbit visualization later.
export const OrbitLayer: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={className}
			aria-hidden="true"
			style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				background:
					"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 65%)",
				mixBlendMode: "overlay",
			}}
		/>
	);
};

export default OrbitLayer;
