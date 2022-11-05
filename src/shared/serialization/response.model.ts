export interface SuccessResponse {
  data: any;
}

export interface ErrorResponse {
  errorCode: any;
}

export type Response = SuccessResponse | ErrorResponse;
