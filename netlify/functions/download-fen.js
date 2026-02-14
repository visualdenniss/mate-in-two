const axios = require('axios');

exports.handler = async (event) => {
  const { fen, id } = event.queryStringParameters;
  const lichessUrl = `https://lichess1.org/export/fen.gif?fen=${encodeURIComponent(fen)}_-_0_1&color=white`;

  try {
    // 1. Fetch the image from Lichess
    const response = await axios.get(lichessUrl, {
      responseType: 'arraybuffer',
    });

    // 2. Return the image data with CORS headers and "attachment" disposition
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Content-Disposition': `attachment; filename="${id}.gif"`,
        'Access-Control-Allow-Origin': '*', // Allows your frontend to read this
      },
      body: Buffer.from(response.data).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch image' }),
    };
  }
};
