
export type FetchDataSuccess<T> = {
  data: T;
  status: "success";
  error: null;
};

export type FetchDataLoading = {
  data: null;
  status: "loading";
  error: null;
};

export type FetchDataError = {
  data: null;
  status: "error";
  error: Error;
};

export type FetchDataResult<T> =
  | FetchDataLoading
  | FetchDataError
  | FetchDataSuccess<T>;