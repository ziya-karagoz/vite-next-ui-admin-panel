import { IConditionLogic } from "../types/dynamo-table.types";

// Helper function to find value by key, supporting nested objects
export function findValueByKey(row: any, key: string): any {
  const keys = key.split(".");
  return keys.reduce(
    (acc, k) => (acc && acc[k] !== undefined ? acc[k] : null),
    row
  );
}

// Generate URL function with updates
export function generateUrl(
  pathname: string,
  searchParams: URLSearchParams,
  updates: { [key: string]: string | undefined }
): string {
  const params = new URLSearchParams(searchParams);

  // Update the query parameters as per the updates provided
  for (const key in updates) {
    const value = updates[key];
    if (value !== undefined) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  return `${pathname}?${params.toString()}`;
}

export function checkConditions(conditions: { key: string; value?: any; logic: IConditionLogic }[], row: any): boolean {
  if (!conditions || conditions.length === 0) {
    return true;
  }

  return conditions.every(condition => {
    const rowValue = findValueByKey(row, condition.key);
    switch (condition.logic) {
      case IConditionLogic.EQUAL:
        return rowValue === condition.value;
      case IConditionLogic.NOT_EQUAL:
        return rowValue !== condition.value;
      case IConditionLogic.GREATER_THAN:
        return rowValue > condition.value;
      case IConditionLogic.LESS_THAN:
        return rowValue < condition.value;
      case IConditionLogic.GREATER_THAN_OR_EQUAL:
        return rowValue >= condition.value;
      case IConditionLogic.LESS_THAN_OR_EQUAL:
        return rowValue <= condition.value;
      case IConditionLogic.IN:
        return Array.isArray(condition.value) && condition.value.includes(rowValue);
      case IConditionLogic.NOT_IN:
        return Array.isArray(condition.value) && !condition.value.includes(rowValue);
      default:
        return false;
    }
  });
};