import { Request } from "express";

export function getParam(req: Request, key: string): string {
  const val = req.params[key];
  return Array.isArray(val) ? val[0] : val;
}

export function getQueryParam(
  req: Request,
  key: string
): string | undefined {
  const val = req.query[key];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0 && typeof val[0] === "string")
    return val[0];
  return undefined;
}
