import { useState, useEffect } from "react";

export function useFetch(url, transformFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Ooops.. Error: ${res.status}`);

        const json = await res.json();

        const transformed = transformFn ? transformFn(json) : json;

        if (isMounted) setData(transformed);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
