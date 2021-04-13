import React, { useState } from "react";
import { useFetchData } from "./useFetchData";

export default () => {
  const [name, setName] = useState("");

  const { status } = useFetchData(() => new Promise(r => setTimeout(r, 2000)), [
    name
  ]);
  const { status: error } = useFetchData(
    () => new Promise((_, r) => setTimeout(r, 2000))
  );

  setTimeout(() => setName("John"), 4000);

  return (
    <div>
      <h1>Success callback: {status}!</h1>
      <h1>Error callback: {error}!</h1>

      <h1>Name: {name}!</h1>
    </div>
  );
};
