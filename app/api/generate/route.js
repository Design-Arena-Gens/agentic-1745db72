export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Si pas de clé API, génère une image placeholder
    const seed = Math.floor(Math.random() * 10000);
    return Response.json({
      imageUrl: `https://picsum.photos/seed/${seed}/512/512`
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: 'Professional portrait photo of a stylish social media influencer, fashionable outfit, modern aesthetic, studio lighting, high quality, photorealistic',
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return Response.json({
      imageUrl: data.data[0].url
    });
  } catch (error) {
    // En cas d'erreur, utilise un service de placeholder
    const seed = Math.floor(Math.random() * 10000);
    return Response.json({
      imageUrl: `https://picsum.photos/seed/${seed}/512/512`
    });
  }
}
