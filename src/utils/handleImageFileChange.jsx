import Resizer from "react-image-file-resizer";

export default async function handleImageFileChange(
	e,
	setImg,
	setErrorMessage,
	setErrorActive,
	setApiCalled
) {
	const imageFile = e.target.files[0];

	if (!imageFile.type.includes("image")) {
		setImg(null);
		setErrorMessage("Please add a valid image file");
		setErrorActive(true);
		setApiCalled(false);
		return;
	}

	setErrorMessage("");
	setErrorActive(false);

	Resizer.imageFileResizer(
		imageFile,
		300, // Width
		300, // Height
		"JPEG", // Format
		100, // Quality
		0, // Rotation
		(resizedFile) => {
			if (resizedFile.size > 1000000) {
				setImg(null);
				setErrorMessage("Image too large, please add an image under 1MB");
				setErrorActive(true);
				setApiCalled(false);
				return;
			}
			setImg(resizedFile); // Set the resized image as a File object
		}
	);
}
