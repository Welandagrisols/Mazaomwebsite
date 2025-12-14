import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, desc } from 'drizzle-orm';
import { clients, licenses, insertClientSchema, insertLicenseSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

type Bindings = {
  DATABASE_URL: string;
  HYPERDRIVE?: { connectionString: string };
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());
app.use('*', logger());

async function getDb(env: Bindings) {
  const connectionString = env.HYPERDRIVE?.connectionString || env.DATABASE_URL;
  const client = new Client({ connectionString });
  await client.connect();
  return { db: drizzle(client), client };
}

app.get('/', (c) => {
  return c.json({ message: 'REST API running on Cloudflare Workers!' });
});

app.get('/api/clients', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const result = await db.select().from(clients).orderBy(desc(clients.createdAt));
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.get('/api/clients/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.post('/api/clients', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const body = await c.req.json();
    const parseResult = insertClientSchema.safeParse(body);
    if (!parseResult.success) {
      return c.json({ message: fromZodError(parseResult.error).message }, 400);
    }
    const result = await db.insert(clients).values(parseResult.data).returning();
    return c.json(result[0], 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.patch('/api/clients/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const result = await db.update(clients).set(body).where(eq(clients.id, id)).returning();
    if (!result[0]) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.delete('/api/clients/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const result = await db.delete(clients).where(eq(clients.id, id)).returning();
    if (result.length === 0) {
      return c.json({ message: 'Client not found' }, 404);
    }
    return c.body(null, 204);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.get('/api/licenses', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const result = await db.select().from(licenses).orderBy(desc(licenses.createdAt));
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.get('/api/licenses/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const result = await db.select().from(licenses).where(eq(licenses.id, id)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.get('/api/licenses/key/:key', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const key = c.req.param('key');
    const result = await db.select().from(licenses).where(eq(licenses.key, key)).limit(1);
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.post('/api/licenses', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const body = await c.req.json();
    const parseResult = insertLicenseSchema.safeParse(body);
    if (!parseResult.success) {
      return c.json({ message: fromZodError(parseResult.error).message }, 400);
    }
    const result = await db.insert(licenses).values(parseResult.data).returning();
    return c.json(result[0], 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.patch('/api/licenses/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const result = await db.update(licenses).set(body).where(eq(licenses.id, id)).returning();
    if (!result[0]) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

app.delete('/api/licenses/:id', async (c) => {
  const { db, client } = await getDb(c.env);
  try {
    const id = parseInt(c.req.param('id'));
    const result = await db.delete(licenses).where(eq(licenses.id, id)).returning();
    if (result.length === 0) {
      return c.json({ message: 'License not found' }, 404);
    }
    return c.body(null, 204);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  } finally {
    await client.end();
  }
});

export default app;
