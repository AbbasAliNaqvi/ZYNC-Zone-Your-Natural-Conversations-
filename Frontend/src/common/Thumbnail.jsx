import { Image } from "react-native"
import utlis from "../core/utlis"

function Thumbnail({ url, size }) {
	return (
	console.log(url),
	<Image 
		source={utlis.thumbnail(url)}
			style={{ 
				width: size, 
				height: size, 
				borderRadius: size / 2,
				backgroundColor: '#e0e0e0' 
			}}
	/>
	)
}

export default Thumbnail