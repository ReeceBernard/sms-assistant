export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResponse<T> = Promise<T>;
export interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}
