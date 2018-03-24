export default function userName(login, firstName, lastName) {
	return (firstName || lastName ? `${firstName} ${lastName}` : login);
}
