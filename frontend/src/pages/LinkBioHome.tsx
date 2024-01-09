import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/linkbiohome.css";

const LinkBioHome = () => {
  const { id } = useParams();
  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:5000/api/users/details/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      setData(json);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="linkbioHome">
      <h1>mybio home</h1>
      <button>copy link</button>
      <Link to='/'>live bio</Link>
      <Link to='/'>edit bio</Link>
    </div>
  );
};

export default LinkBioHome;
