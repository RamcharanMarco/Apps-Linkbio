import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../styles/signup.css";
import { useSignupPhoto } from "../hooks/useSignupPhoto";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signup, error, loading } = useSignup();
  const { signupPhoto } = useSignupPhoto();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState();

  const handleClick = (e: any): void => {
    e.preventDefault();
    if (photo) {
      signupPhoto(photo, email, password, username);
    }
    if (!photo) {
      signup(email, password, username);
    }
  };

  const next = (e: any) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  const prev = (e: any) => {
    e.preventDefault();
    setPage((prev) => prev - 1);
  };

  return (
    <div className="signup">
      <Link className='auth-logo' to='/'><h1>LINKBIO</h1></Link>
      <h1 className="heading">SIGNUP</h1>
      <div className="container">
        {page === 1 ? (
          <div className="box">
            <div className="content">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
                            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="email"
              />
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
              />
            </div>
            <div className="navigation page1">
              <BsArrowRightCircle className="signup-button" onClick={next} />
            </div>
          </div>
        ) : page === 2 ? (
          <div className="box">
            <div className="content">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  height={200}
                  width={200}
                  alt="Thumb"
                />
              ) : (
                ""
              )}
              <input
                type="file"
                name="file"
                className="photo"
                onChange={(e: any) => {
                  setPhoto(e.target.files[0]);
                  setSelectedImage(e.target.files[0]);
                }}
              />
              <button>upload pic</button>
              <button onClick={handleClick}>skip and create account</button>
            </div>
            <div className="navigation">
              <BsArrowLeftCircle className="signup-button" onClick={prev} />
            </div>
          </div>
        ) :
          ""}
      </div>
    </div>
  );
};

export default Signup;
