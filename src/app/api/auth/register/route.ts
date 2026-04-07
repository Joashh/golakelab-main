export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.message }, { status: 400 });
  }

  return Response.json({ success: true });
}