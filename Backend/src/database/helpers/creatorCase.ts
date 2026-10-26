import type { ColumnBaseConfig, ColumnDataType } from "drizzle-orm";
import type { ExtraConfigColumn } from "drizzle-orm/pg-core";

export function creatorCases(
  principalCase: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>,
  cases: string[] | number[],
  conditions: any[],
  extraCondition?: number,
) {
  extraCondition = extraCondition ? extraCondition : 0;
  const when = cases.map(
    (ars, indx) => `WHEN '${ars}' THEN ${conditions[indx] + extraCondition}`,
  );
  return `CASE ${principalCase} ${when.join("")} END`;
}
