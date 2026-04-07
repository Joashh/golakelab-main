// lib/wordpress.ts - Alternative using JWT
export async function createOrGetWordPressUser(email: string, name: string) {
  try {
    // First, get a JWT token using admin credentials
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.WP_ADMIN_USERNAME,
        password: process.env.WP_ADMIN_PASSWORD,
      }),
    });
    
    const tokenData = await tokenRes.json();
    
    if (!tokenRes.ok || !tokenData.token) {
      console.error('Failed to get JWT token:', tokenData);
      return null;
    }
    
    const headers = {
      'Authorization': `Bearer ${tokenData.token}`,
      'Content-Type': 'application/json',
    };
    
    // Check if user exists
    const checkUserRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/users?search=${encodeURIComponent(email)}`,
      { headers }
    );
    
    if (checkUserRes.ok) {
      const users = await checkUserRes.json();
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) return existingUser;
    }
    
    // Create new user
    const username = email.split('@')[0];
    const randomPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
    
    const createUserRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/users`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          username,
          name,
          password: randomPassword,
          roles: ['subscriber'],
        }),
      }
    );
    
    if (createUserRes.ok) {
      return await createUserRes.json();
    }
    
    const errorText = await createUserRes.text();
    console.error('Failed to create user:', errorText);
    return null;
    
  } catch (error) {
    console.error('Error in createOrGetWordPressUser:', error);
    return null;
  }
}