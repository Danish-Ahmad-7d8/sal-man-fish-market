const { createClient } = require('@sanity/client');

const ALLOWED_TYPES = new Set(['product', 'seller']);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  if (!body._type || !ALLOWED_TYPES.has(body._type)) {
    return res.status(400).json({ error: 'Invalid or missing _type' });
  }

  const safeBody = { _type: body._type };
  for (const key of Object.keys(body)) {
    if (key.startsWith('_') && key !== '_type') continue;
    safeBody[key] = body[key];
  }

  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-03-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  try {
    const doc = await client.create(safeBody);
    return res.status(200).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error('Sanity create failed:', err);
    return res.status(500).json({ error: err.message || 'Create failed' });
  }
};
