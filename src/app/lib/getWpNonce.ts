// lib/getWpNonce.ts
let cachedNonce: string | null = null;

export async function getWpNonce(): Promise<string> {
    // Return cached nonce if available
    if (cachedNonce) {
        return cachedNonce;
    }
    
    try {
        // You need to create this endpoint in WordPress
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wpdm/v1/get-nonce`
        );
        const data = await response.json();
        cachedNonce = data.nonce;
        return cachedNonce || ''; // Return empty string if nonce is null/undefined
    } catch (error) {
        console.error('Failed to fetch nonce:', error);
        return ''; // Return empty string on error
    }
}