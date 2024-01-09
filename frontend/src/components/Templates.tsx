import React from "react";
import pic from "../1.png";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/themes.css";

const Templates = () => {
  const { id } = useParams();

  /*
        <div className="box">
          <img src={pic} alt="fngkkrn" />
          <div id='info' className="info">
            <h1>elite clone</h1>
            <p>small description</p>
            <Link to='/'>view</Link>
          </div>
        </div>
  */
  const { user } = useStore();

  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [links, setLinks] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [newphoto, setNewphoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [del, setDel] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [data, setData] = useState('')

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/bio/djdjjd`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      setLoading(false);
      console.log("projects", json);
      setLoading(false);
      setData(json);
      setPhoto(json.photo);
      setName(json.name);
      setTheme(json.theme);
      setLinks(json.links);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="themes">
      <h1>templates</h1>      
      </div>
  );
};

export default Templates;