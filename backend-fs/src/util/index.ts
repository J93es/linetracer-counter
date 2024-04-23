export function anyToString(data: any): string {
  if (data === null) {
    return "";
  }
  if (data === undefined) {
    return "";
  }
  if (typeof data === "string") {
    return data;
  }
  try {
    return JSON.stringify(data);
  } catch (error) {
    return "";
  }
}
