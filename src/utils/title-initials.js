export default function titleInitials(title) {
	try {
		return title
			.trim()
			.split(' ')
			.map(word => word[0].toUpperCase())
			.slice(0, 2)
			.join('');
	} catch(e) {
		console.error(e);
		return 'U';
	}
}
