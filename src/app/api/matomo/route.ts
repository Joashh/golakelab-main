const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;

export async function GET() {
    const form = new URLSearchParams();

    form.append("module", "API");
    form.append("method", "VisitsSummary.get");
    form.append("idSite", "1");
    form.append("period", "day");
    form.append("date", "today");
    form.append("format", "JSON");
    form.append("token_auth", process.env.MATOMO_TOKEN!);

    const res = await fetch(`${BASE_URL}/matomo/index.php`, {
        method: "POST",
        body: form,
        cache: "no-store",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const text = await res.text();

    try {
        return Response.json(JSON.parse(text));
    } catch (err) {
        console.error("Matomo API error response:", text);
        return Response.json({ nb_visits: 0 });
    }
}