// middlewares/cors.ts
import { NextApiResponse, NextApiRequest } from 'next';

const allowCors = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await handler(req, res);
};

export default allowCors;
