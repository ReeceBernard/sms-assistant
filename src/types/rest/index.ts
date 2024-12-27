import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface RequestBody<T> extends Request {
  body: T;
}
export interface RequestPath<T extends ParamsDictionary> extends Request {
  params: T;
}
export interface RequestQuery<T extends ParsedQs> extends Request {
  query: T;
}
export interface ResponseBody<T> extends Response {
  response: T;
}
