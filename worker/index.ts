import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, desc } from 'drizzle-orm';
import { clients, licenses, insertClientSchema, insertLicenseSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

type Bindings = {
  DATABASE_URL: string;
  HYPERDRIVE?: { connectionString: string };
};

type Variables = {
  db: NodePgDatabase;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

let pool: Pool | null = null;
let db: NodePgDatabase | null = null;

function getDb(env: Bindings): NodePgDatabase {
  if (!db) {
    const connectionString = env.HYPERDRIVE?.connectionString || env.DATABASE_URL;
    pool = new Pool({ 
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
    });
    db = drizzle(pool);
  }
  return db;
}

app.use('*', cors());
app.use('*', logger());

app.use('*', async (c, next) => {
  c.set('db', getDb(c.env));
  await next();
});

app.get('/', (c) => {
  return c.json({ message: 'REST API running on Cloudflare Workers!' });
});

app.get('/api/clients', async (c) => {
  try {
    const database = c.get('db');
    const result = await database.select().from(clients).orderBy(desc(clients.createdAt));
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.get('/api/clients/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const result = await database.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.post('/api/clients', async (c) => {
  try {
    const database = c.get('db');
    const body = await c.req.json();
    const parseResult = insertClientSchema.safeParse(body);
    if (!parseResult.success) {
      return c.json({ message: fromZodError(parseResult.error).message }, 400);
    }
    const result = await database.insert(clients).values(parseResult.data).returning();
    return c.json(result[0], 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.patch('/api/clients/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const result = await database.update(clients).set(body).where(eq(clients.id, id)).returning();
    if (!result[0]) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.delete('/api/clients/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const result = await database.delete(clients).where(eq(clients.id, id)).returning();
    if (result.length === 0) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.body(null, 204);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.get('/api/licenses', async (c) => {
  try {
    const database = c.get('db');
    const result = await database.select().from(licenses).orderBy(desc(licenses.createdAt));
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.get('/api/licenses/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const result = await database.select().from(licenses).where(eq(licenses.id, id)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.get('/api/licenses/key/:key', async (c) => {
  try {
    const database = c.get('db');
    const key = c.req.param('key');
    const result = await database.select().from(licenses).where(eq(licenses.key, key)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.post('/api/licenses', async (c) => {
  try {
    const database = c.get('db');
    const body = await c.req.json();
    const parseResult = insertLicenseSchema.safeParse(body);
    if (!parseResult.success) {
      return c.json({ message: fromZodError(parseResult.error).message }, 400);
    }
    const result = await database.insert(licenses).values(parseResult.data).returning();
    return c.json(result[0], 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.patch('/api/licenses/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const result = await database.update(licenses).set(body).where(eq(licenses.id, id)).returning();
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

app.delete('/api/licenses/:id', async (c) => {
  try {
    const database = c.get('db');
    const id = parseInt(c.req.param('id'));
    const result = await database.delete(licenses).where(eq(licenses.id, id)).returning();
    if (result.length === 0) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.body(null, 204);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

export default app;
