export default {
	async fetch(request) {
		const url = new URL(request.url);

		// API endpoint to fetch data from Google Drive (server-side to avoid CORS)
		if (url.pathname === "/api/data/output") {
			try {
				const response = await fetch('https://drive.google.com/uc?export=download&id=1PtGtrxDIoBi0047H6OqQRaOCixwQioHP');
				if (response.ok) {
					const data = await response.json();
					return Response.json(data);
				} else {
					return Response.json({ error: 'Failed to fetch output data' }, { status: response.status });
				}
			} catch (error) {
				return Response.json({ error: 'Failed to fetch output data' }, { status: 500 });
			}
		}

	if (url.pathname === "/api/data/people") {
		try {
			const response = await fetch('https://drive.google.com/uc?export=download&id=1IFrFVz_kWsnI04462eTlyYQcdDa7MLd1');
			if (response.ok) {
				const data = await response.json();
				return Response.json(data);
			} else {
				return Response.json({ error: 'Failed to fetch people data' }, { status: response.status });
			}
		} catch (error) {
			return Response.json({ error: 'Failed to fetch people data' }, { status: 500 });
		}
	}

	if (url.pathname === "/api/data/home-contact-institutions") {
		try {
			const response = await fetch('https://drive.google.com/uc?export=download&id=1WpXrvt4SLhnmCepmJYtNfC9jVC4QT7XG');
			if (response.ok) {
				const data = await response.json();
				return Response.json(data);
			} else {
				return Response.json({ error: 'Failed to fetch home/contact/institutions data' }, { status: response.status });
			}
		} catch (error) {
			return Response.json({ error: 'Failed to fetch home/contact/institutions data' }, { status: 500 });
		}
	}

	if (url.pathname.startsWith("/api/")) {
			return Response.json({
				name: "Cloudflare",
			});
		}
		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
