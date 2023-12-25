import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useAuth from "../Hooks/useAuth";


const GoogleLogin = () => {
    const {googleLogin} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosURL = useAxiosBaseUrl();

    const handleGoogleLogin = () => {
        googleLogin()
        .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser);
            const userInfo = {
                name: loggedUser?.displayName,
                email: loggedUser?.email
            }
            axiosURL.post('/users', userInfo)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successfully",
                        showConfirmButton: false,
                        timer: 1500,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                      });
                      navigate(location?.pathname ? location?.pathname : "/")
                }
            })
        })
        .catch(err => {
            if(err){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "invalid information",
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                  });
            }
        })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="text-center">
                <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex justify-center items-center gap-2">
                    <FaGoogle></FaGoogle> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;