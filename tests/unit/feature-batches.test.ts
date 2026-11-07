import { describe, expect, it } from "vitest";
import { groupCsvRows, serializeCsv } from "../../.github/scripts/feature-batches.mjs";

describe("feature CSV batches", () => {
  it("repeats the header and keeps every data row in batches of at most 50", () => {
    const header = ["id", "title"];
    const rows = Array.from({ length: 101 }, (_, index) => [
      String(index + 1),
      `Feature ${index + 1}`,
    ]);

    const batches = groupCsvRows([header, ...rows], 50);

    expect(batches.map((batch) => batch.length - 1)).toEqual([50, 50, 1]);
    expect(batches.map((batch) => batch[0])).toEqual([header, header, header]);
    expect(batches.flatMap((batch) => batch.slice(1))).toEqual(rows);
  });

  it("quotes fields and escapes embedded quotes when serializing", () => {
    expect(
      serializeCsv([
        ["title", "body"],
        ['A "quoted" title', "line one\nline two"],
      ]),
    ).toBe('"title","body"\n"A ""quoted"" title","line one\nline two"');
  });
});
