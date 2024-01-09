import React from "react";
import pic from "../1.png";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import "../styles/userProjectsPage.css";

const LinkBioPreview = () => {
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
  const [description, setDescription] = useState<string>("");

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
      setDescription(json.description);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="userProjectsPage">
      {data && data.length === 0 ? (
        <div className="empty">
          <h1>You have no projects</h1>
          <Link to={`/user/${id}/projects/add`}>Add a Project</Link>
        </div>
      ) : (
        <div className="container"
        >
          <h1>name:{name}</h1>
          <h1>theme:{theme}</h1>
          <h1>links:{links}</h1>
          <h1>image : {photo}</h1>
          <h1>descriotn: {description}</h1>
        </div>
      )}
                            {data && data.length > 3 ? <button>load more</button> : null}
    </div>
  );
};

export default LinkBioPreview;


/*import {FC} from 'react'
import '../styles/confirmdeleteallprojects.css'
import { useDeleteProject } from '../hooks/useDeleteProject';
import {useState} from 'react'
import {IoArrowBackCircleOutline} from 'react-icons/io5'

interface AppProps {
  toggleDeleteProject: (params: any) => any;
  id:string
}

const ConfirmDeleteProject: FC<AppProps> = ({toggleDeleteProject, id}) => {

  const {deleteProject} = useDeleteProject()
  const [val, setVal] = useState<string>('')


  return (
    <div className="confirmdeleteallprojects">
        <h1>delete project</h1>
        <p>please enter <i>delete all projects</i></p>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)}/>
        <IoArrowBackCircleOutline className='cancel' onClick={toggleDeleteProject}/>
        <button disabled={val !== 'delete all projects'} onClick={() => deleteProject(id)}>delete project</button>
    </div>
  )
}

export default ConfirmDeleteProject*/