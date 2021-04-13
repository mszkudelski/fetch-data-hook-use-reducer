import { Reducer, useEffect, useReducer, useState } from "react";
import { FetchDataLoading, FetchDataResult } from "./fetch-data-results";

function init(): FetchDataLoading {
  return { status: "loading", data: null, error: null };
}

enum ActionTypes {
  Success = "success",
  Error = "error",
  Loading = "loading"
}

interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

const reducer = <T>(
  state: FetchDataResult<T>,
  { type, payload }: Action<T>
): FetchDataResult<T> => {
  switch (type) {
    case ActionTypes.Success:
      return { status: "success", data: payload, error: null };
    case ActionTypes.Error:
      return {
        status: "error",
        data: null,
        error:
          payload instanceof Error
            ? payload
            : new Error((payload || {}).toString())
      };
    case ActionTypes.Loading:
      return init();
    default:
      throw new Error(
        "useFetchData hook: incorrect action type passed: " + type
      );
  }
};

export const useFetchData = <T>(
  callback: () => Promise<T>,
  deps: unknown[] = []
) => {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    dispatch({ type: ActionTypes.Loading });

    callback()
      .then(data => dispatch({ payload: data, type: ActionTypes.Success }))
      .catch(error => dispatch({ payload: error, type: ActionTypes.Error }));
  }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};
