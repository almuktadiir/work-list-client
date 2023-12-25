import { Link } from 'react-router-dom';
import regIcon from '../../assets/register.svg'
import { useForm } from 'react-hook-form';
import useAxiosBaseUrl from '../../Components/hooks/useAxiosBaseUrl';
import Swal from 'sweetalert2';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import useAuth from '../../Components/Hooks/useAuth';

const Register = () => {
    const {createUser, updateUser} = useAuth();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const axiosURL = useAxiosBaseUrl();
    
      const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser);
            updateUser(data.name, data.photo)
            .then(() => {
                const userInfo ={
                    name : data.name,
                    email: data.email
                }
                axiosURL.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('user added to the database')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "sign up successfully",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
            })
        })
        .catch(err => {
            console.log(err.message);
            if(err){
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Email already in use",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-center mb-12">Register now!</h1>
                    <img className='' src={regIcon} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600 font-bold">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input {...register("photo", { required: true})} type="text" placeholder="PhotoURL" className="input input-bordered" required />
                            {errors.photo && <span className="text-red-600 font-bold">PhotoURL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                            {errors.email?.type === 'email' && <span className="text-red-600 font-bold">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true, minLength: 6, maxLength: 20 })} type="password" placeholder="password" className="input input-bordered" required />
                            {errors.password?.type === 'required' && <span className="text-red-600 font-bold">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 font-bold">Password should be at least 6 characters</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div>
                            <p><small>Already have an account? <Link to={'/login'} className="font-bold">Login</Link></small></p>
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

export default Register;