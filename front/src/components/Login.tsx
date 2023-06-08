import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { client } from "../sanity/client";
import { DecodedResponse } from "../interfaces/googleSignIn";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccessLogin = (response: CredentialResponse) => {
    if (!response.credential) {
      return;
    }

    const decoded: DecodedResponse = jwtDecode(response.credential);

    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture, sub } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => navigate("/", { replace: true }));
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          controls={false}
          loop
          autoPlay
          muted
        >
          <source src={shareVideo} type={"video/mp4"} />
        </video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <h1 className="text-white text-3xl">Social Media App</h1>
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(response) => handleGoogleSuccessLogin(response)}
              onError={() => console.log("Error")}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
