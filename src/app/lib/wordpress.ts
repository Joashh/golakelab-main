// app/lib/wordpress.ts

export async function createOrGetWordPressUser(email: string, name: string) {
  try {
    console.log("Calling createOrGetWordPressUser with:", { email, name });
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/custom/v1/google-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.WP_API_SECRET!,
        },
        body: JSON.stringify({ email, name }),
      }
    );

    console.log("WordPress API response status:", res.status);
    
    const data = await res.json();
    console.log("WordPress API response data:", data);

    if (!res.ok) {
      throw new Error(
        `Failed to sync user with WordPress (status: ${res.status}): ${JSON.stringify(data)}`
      );
    }

    if (!data || !data.id) {
      throw new Error("Invalid response from WordPress");
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role || 'subscriber'
    };
  } catch (error) {
    console.error("createOrGetWordPressUser error:", error);
    throw error; // Re-throw to be caught in signIn callback
  }
}