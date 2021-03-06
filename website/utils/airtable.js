import fetch from 'node-fetch'

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || ''

export async function getRecords({
  baseName = '',
  tableName = '',
  pageSize = 100,
  maxRecords = 100,
  view = 'Grid%20view'
}) {
  if (!AIRTABLE_TOKEN) {
    throw new Error('missing: process.env.AIRTABLE_TOKEN')
  }

  try {
    let result = await fetch(
      `https://api.airtable.com/v0/${baseName}/${tableName}?maxRecords=${maxRecords}&pageSize=${pageSize}&view=${view}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    ).then(r => r.json())

    let { records } = result

    return records.map(r => r.fields)
  } catch (err) {
    console.error(err)
    throw new Error('airtable: failed: ' + err.message)
  }
}
