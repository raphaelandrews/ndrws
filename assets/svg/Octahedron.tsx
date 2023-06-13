interface SVGProps {
	width?: string;
	height?: string;
}

export const Octahedron: React.FC<SVGProps> = ({ width, height }) => {
	return (
		<svg
			width={width}
			height={height}
			x="0px"
			y="0px"
			viewBox="0 0 64 64"
			fill="#11100E"
			stroke="#361A0E"
			strokeWidth="2px"
		>
			<path
				d="M1.3,18.9L1,19.2v0.4v24.9v0.4l0.3,0.3l17.6,17.6l0.3,0.3h
				0.4h24.9h0.4l0.3-0.3l17.6-17.6l0.3-0.3v-0.4V19.6v-0.4l-0.3
				-0.3L45.1,1.3L44.8,1h-0.4H19.6h-0.4l-0.3,0.3L1.3,18.9z"
			/>
		</svg>
	)
}
