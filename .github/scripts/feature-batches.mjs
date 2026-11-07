export function groupCsvRows(rows, maxRows) {
  if (!Number.isInteger(maxRows) || maxRows < 1) {
    throw new RangeError("maxRows must be a positive integer.");
  }

  const [header, ...data] = rows;
  if (!header) return [];

  const batches = [];
  for (let offset = 0; offset < data.length; offset += maxRows) {
    batches.push([header, ...data.slice(offset, offset + maxRows)]);
  }
  return batches;
}

export function serializeCsv(rows) {
  return rows
    .map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}
