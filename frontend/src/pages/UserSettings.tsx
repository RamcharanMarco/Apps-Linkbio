import "../styles/settings.css";
import ConfirmDeleteAccount from "../components/ConfirmDeleteAccount";
import ConfirmDeleteAllProjects from "../components/ConfirmDeleteAllProjects";
import ConfirmChangePassword from "../components/ConfirmChangePassword";
import { useLogout } from "../hooks/useLogout";
import { CiEdit } from "react-icons/ci";
import { useEditUserDetails } from "../hooks/useEditUserDetails";

import { useEffect, useState, useCallback } from "react";
import { useStore } from "../store/store";
import { Link, useParams } from "react-router-dom";

import placeholder from "../assets/placeholder.jpg";

const UserSettingsPage = () => {
  const { editUserDetails } = useEditUserDetails();

  const { logout } = useLogout();

  const [edit, setEdit] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteAllProjects, setDeleteAllProjects] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [type, setType] = useState<string>("");
  const [experience, setExperience] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [newphoto, setNewphoto] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [repo, setRepo] = useState<string>("");

  const [edittype, setEdittype] = useState<boolean>(true);
  const [editexp, setEditexp] = useState<boolean>(true);
  const [editrepo, setEditrepo] = useState<boolean>(true);
  const [editwebsite, setEditwebsite] = useState<boolean>(true);
  const [editlocation, setEditlocation] = useState<boolean>(true);

  const toggleEditDetail = (e: any, field: string) => {
    e.preventDefault();
    if (field === "type") {
      setEdittype(false);
    } else if (field === "exp") {
      setEditexp(false);
    } else if (field === "repo") {
      setEditrepo(false);
    } else if (field === "website") {
      setEditwebsite(false);
    } else if (field === "location") {
      setEditlocation(false);
    }
  };

  const toggleDeleteAccount = (e: any) => {
    e.preventDefault();
    setDeleteAccount(!deleteAccount);
  };

  const toggleDeleteAllProjects = (e: any) => {
    e.preventDefault();
    setDeleteAllProjects(!deleteAllProjects);
  };

  const toggleChangePassword = (e: any) => {
    e.preventDefault();
    setChangePassword(!changePassword);
  };

  const { id } = useParams();
  const { user } = useStore();
  const [data, setData] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `http://localhost:5000/api/users/details/${id}`,
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
      setData(json);
      setType(json.type);
      setExperience(json.experience);
      setLocation(json.location);
      setPhoto(json.photo);
      setWebsite(json.website);
      setRepo(json.repo);
    }
  }, [user.token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const editDetails = (e: any) => {
    e.preventDefault();
    editUserDetails(type, experience, location, website, repo);
  };

  return (
    <div className="settings">
      {deleteAccount ? (
        <ConfirmDeleteAccount toggleDeleteAccount={toggleDeleteAccount} />
      ) : null}
      {deleteAllProjects ? (
        <ConfirmDeleteAllProjects
          toggleDeleteAllProjects={toggleDeleteAllProjects}
        />
      ) : null}
      {changePassword ? (
        <ConfirmChangePassword toggleChangePassword={toggleChangePassword} />
      ) : null}
      {data ? (
        <div className="info-edit">
          <form>
            <div className="photo">
              <h1>PHOTO</h1>
              {photo ? (
                <>
                  <img src={photo} alt="" />
                  <button>please choose photo</button>
                </>
              ) : (
                <>
                  <img src={placeholder} alt="" />
                  <button>add photo</button>
                </>
              )}
            </div>
            <div className="details">
              <h1>DETAILS</h1>
              <div>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={edittype}
                >
                  <option value="frontend">frontend</option>
                  <option value="backend">backend</option>
                  <option value="fullstack">fullstack</option>
                </select>
                {edittype ? (
                  <button onClick={(e) => toggleEditDetail(e, "type")}>
                    <CiEdit />
                  </button>
                ) : (
                  <button onClick={editDetails}>save</button>
                )}
              </div>
              <div>
                {editexp ? (
                  <button onClick={(e) => toggleEditDetail(e, "exp")}>
                    <CiEdit />
                  </button>
                ) : (
                  <button onClick={editDetails}>save</button>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={editwebsite}
                />
                {editwebsite ? (
                  <button onClick={(e) => toggleEditDetail(e, "website")}>
                    <CiEdit />
                  </button>
                ) : (
                  <button onClick={editDetails}>save</button>
                )}
              </div>
              <div>
                <select
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  disabled={editrepo}
                >
                  <option value="github">gitlab</option>
                  <option value="gitlab">gitlab</option>
                  <option value="bitbucket">bitbucket</option>
                </select>
                {editrepo ? (
                  <button onClick={(e) => toggleEditDetail(e, "repo")}>
                    <CiEdit />
                  </button>
                ) : (
                  <button onClick={editDetails}>save</button>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={editlocation}
                />
                {editlocation ? (
                  <button onClick={(e) => toggleEditDetail(e, "location")}>
                    <CiEdit />
                  </button>
                ) : (
                  <button onClick={editDetails}>save</button>
                )}
              </div>
            </div>
          </form>
          <div className="danger">
            <h1>ACCOUNT</h1>
            <div>
              <h1>change password</h1>
              <p>need to update your password for security</p>
              <button onClick={toggleChangePassword}>change</button>
            </div>
            <div>
              <h1>delete account</h1>
              <p>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button onClick={toggleDeleteAccount}>delete</button>
            </div>

            <div>
              <h1>delete all projects</h1>
              <p>
                Once you delete all projects, there is no going back. Please be
                certain.
              </p>
              <button onClick={toggleDeleteAllProjects}>delete</button>
            </div>
            <div>
              <h1>logout</h1>
              <button onClick={logout}>logout</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserSettingsPage;
