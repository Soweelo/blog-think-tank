import { useEffect, useState } from "react";
import axios from "axios";

export default function useThinkTankSearch(offset) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [thinkTanks, setThinkTanks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    setThinkTanks([]);
  }, [offset]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    const request = {
      limit: 10,
      lang: "fr",
      tags: [],
      offset: offset,
    };
    axios
      .post(PF + "/api/posts/find", request, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res.data.data.length);
        setThinkTanks((prevThinkTanks) => {
          return [
            ...new Set([...prevThinkTanks, ...res.data.data.map((b) => b.id)]),
          ];
        });
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [offset]);

  return { loading, error, thinkTanks, hasMore };
}
