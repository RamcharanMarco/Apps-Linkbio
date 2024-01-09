import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/userHome.css";

const UserHome = () => {
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
    <div className="userHome">
      <div className="left">
        <h1>HEY USERNAME</h1>
      </div>
      <div className="right">
              <Link to={`/user/${user.user._id}/settings`}>my settings</Link>
      <Link to={`/user/${user.user._id}/bio`}>my linkbio</Link>
      </div>
    </div>
  );
};

export default UserHome;
