import { Hono } from 'hono';
import { db } from '../../drizzle';
import type { TCaseSchema } from '../types';
import { offenders, type TCases, type TOffenders, cases as casesTable } from '../../drizzle/schema';
import { createId } from '@paralleldrive/cuid2';

const cases = new Hono();

cases.get('/', async (c) => {
  const cases = await db.query.cases.findMany({
    with: {offenders: true}
  });

  return c.json(cases);
});

cases.get('/:id', async (c) => {
  const { id } = c.req.param();
  const data = await db.query.cases.findFirst({where: (table, {eq}) => eq(table.id, id)})

  return c.json(data);
});



// POST
cases.post('/', async (c) => {
  console.log('POST /cases Endpoint hit 🎯');
  const data: TCaseSchema = await c.req.json();
  console.log({ data });
  if (!data) throw new Error('Missing body object');

  // create case
  const caseId = createId();
  const caseData: TCases = {
    id: caseId,
    title: data.title,
    type: data.type,
    description: data.description,
    location: data.location,
  };
  await db.insert(casesTable).values(caseData);

  // create cases offenders
  const offendersData: TOffenders[] = data.offenders.map((item) => ({
    name: item.name,
    email: item.email,
    matricNo: item.matricNo,
    statement: item.statement,
    caseId: caseId,
  }));
  await db.insert(offenders).values(offendersData);

  return c.text(`Create a school case`)
});

export default cases;