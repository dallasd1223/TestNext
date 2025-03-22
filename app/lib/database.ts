
import {Pool} from 'pg';

class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL
        })
    }


    public async getCount(): Promise<number> {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT count FROM pageviews WHERE id = 1');
            return result.rows[0]?.count || 0;
        } finally {
            client.release();
        }
    }

    public async incrementCount(): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('UPDATE pageviews SET count = count + 1 WHERE id = 1');
        } finally {
            client.release();
        }
    }
}

export default new Database();