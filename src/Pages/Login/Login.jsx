import { Link, useLocation, useNavigate } from "react-router-dom";
import logIcon from '../../assets/login.svg'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleLogin from "../../Components/SocialLogin/GoogleLogin";
import useAuth from "../../Components/Hooks/useAuth";


const Login = () => {
    const {loginUser} = useAuth();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    
      const onSubmit = (data) => {
        console.log(data);
        loginUser(data.email, data.password)
        .then(res =>{
            const loggedUser = res.user;
            console.log(loggedUser);
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
              navigate(location?.state ? location?.state : '/')
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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-center mb-6">Login now!</h1>
                    <img className="w-9/12 mx-auto" src={logIcon} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered"  />
                            {errors.email?.type === 'email' && <span className="text-red-600 font-bold">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true, maxLength:20, minLength:6 })} type="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="text-red-600 font-bold">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 font-bold">Password should be at least 6 characters</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div>
                            <p><small>New here? Please <Link to={'/register'} className="font-bold">Register</Link></small></p>
                        </div>
                        <div>
                            <GoogleLogin></GoogleLogin>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;