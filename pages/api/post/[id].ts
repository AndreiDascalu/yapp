import { postDetailQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;

        // Check if id is undefined
        if (id === undefined) {
            res.status(400).json({ error: 'ID parameter is missing' });
            return;
        }

        // Use optional chaining to safely access properties
        const query = postDetailQuery(id as string);

        const data = await client.fetch(query);

        res.status(200).json(data[0]);
    }
}
