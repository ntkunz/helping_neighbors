import DOMPurify from "dompurify";

export default function purify(userInput) {
	return DOMPurify.sanitize(userInput);
}
