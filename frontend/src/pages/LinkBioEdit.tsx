import "../styles/userproject.css";
import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";
import ConfirmDeleteProject from "../components/ConfirmDeleteProject";
import { useEditProject } from "../hooks/useEditProject";
import { useChangeProjectPhoto } from "../hooks/useChangeProjectPhoto";
import LinkBioPreview from "../components/LinkBioPreview";
import Templates from "../components/Templates";

const LinkBioEdit = () => {
  const { changeProjectPhoto } = useChangeProjectPhoto();

  const [links, setLinks] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [newphoto, setNewphoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [del, setDel] = useState<boolean>(false);
  const [temp, setTemp] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');


  const [id, setId] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const { editProject } = useEditProject();

  const { projectid } = useParams();
  const { user } = useStore();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [edit, setEdit] = useState<any>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:5000/api/bio/hshs`, {
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
      setPhoto(json.photo);
      setName(json.name);
      setTheme(json.theme);
      setId(json._id);
      setLinks(json.links);
      setDescription(json.description);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const toggle = (e: any) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const toggleDelete = (e: any) => {
    e.preventDefault();
    setDel(!del);
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    /*editProject(
      name,
    );*/
  };

  const handleEditPhoto = (e: any) => {
    e.preventDefault();
    changeProjectPhoto(newphoto);
  };

  /*if (loading) {
    return (
      <div className="loadinguserproject">
        <h1>loading</h1>
      </div>
    );
  }*/

  const addLink = (e: any) => {
    e.preventDefault();
    setLinks((prev) => [link, ...prev]);
    setLink("");
  };

  const addLink2 = (tech: string) => {
    setLinks((prev) => [tech, ...prev]);
    setLink("");
  };

  const toggleTemplates = (e: any) => {
    e.preventDefault();
    setTemp(!temp);
  };

  return (
    <div className="userProjectPage">
      {del ? (
        <ConfirmDeleteProject id={id} toggleDeleteProject={toggleDelete} />
      ) : null}
      {temp ? <Templates /> : null}
      {data ? (
        <div>
          {data ? (
            <div className="project">
              <LinkBioPreview key={1} />
              <div>
              <div className="edit-box">
                <p>photo</p>
                <img src={photo} alt="photo" />
                <>
                  <input
                    name="photo"
                    onChange={(e: any) => setNewphoto(e.target.files[0])}
                    type="file"
                  />
                  <button onClick={handleEditPhoto}>save photo</button>
                </>
                <hr />
              </div>
                  <div className="edit-box">
                    <p>name</p>
                    <input
                      type="text"
                      onChange={(e: any) => setName(e.target.value)}
                      value={name}
                      placeholder="name"
                    />
                    <hr />
                  </div>
                  <div className="edit-box">
                    <p>description</p>
                    <input
                      type="text"
                      onChange={(e: any) => setDescription(e.target.value)}
                      value={description}
                      placeholder="description"
                    />
                    <hr />
                  </div>
                  <div className="edit-box">
                    <p>links</p>
                    {links.map((tech) => (
                      <p>{tech}</p>
                    ))}
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="link"
                    />
                    <button onClick={addLink}>add tech</button>
                  </div>
                  <div className="edit-box">
                    <p>theme</p>
                    <input
                      type="text"
                      placeholder="theme"
                      value={theme}
                      onChange={(e: any) => setTheme(e.target.value)}
                    />
                    <button onClick={toggleTemplates}>toggle templates</button>
                    <hr />
                  </div>

                  <button onClick={handleEdit}>save</button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LinkBioEdit;
