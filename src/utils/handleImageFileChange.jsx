import Resizer from "react-image-file-resizer";

export default async function handleImageFileChange(
	e,
	setImg,
	setErrorMessage,
	setErrorActive,
	setApiCalled
) {
	if (!e.target.files || e.target.files.length === 0) {
		setImg(null);
		return;
	}

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
	setApiCalled(false);

	Resizer.imageFileResizer(
		imageFile,
		300, // Width
		300, // Height
		"JPEG", // Format
		100, // Quality
		0, // Rotation
		(dataURL) => {
			// Convert data URL to Blob
			// Something far beyond my understanding that I've used the below
			// snippet from https://stackoverflow.com/questions/12168909/blob-from-dataurl
			// and https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
			const byteString = atob(dataURL.split(",")[1]);
			const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			const blob = new Blob([ab], { type: mimeString });

			// Create a File object from the Blob
			const resizedFile = new File([blob], imageFile.name, {
				type: imageFile.type,
				lastModified: imageFile.lastModified,
			});

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
