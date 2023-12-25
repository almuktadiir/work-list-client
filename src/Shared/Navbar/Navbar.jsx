import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import { FaSignInAlt } from "react-icons/fa";
import logoTask from "../../assets/task.jpg";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const navLink = <>
        <li><NavLink to={'/'} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }>Home</NavLink></li>
        <li><NavLink to={'/about'} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }>About</NavLink></li>

        {/* <li><NavLink to={'/secret'} className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }>About Us</NavLink></li> */}
    </>

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err.message))
    }


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <img src={logoTask} className="w-12 h-12 rounded-full" alt="" />
                <span className="italic font-bold">Task Management</span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?

                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div className="avatar m-1" tabIndex={0} role="button">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
                            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="text-green-500 font-bold ml-2 mb-2">{user?.displayName}</li>
                                <li className="font-bold mb-2"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                                <li><button onClick={handleLogout} className="bg-gray-300 text-black">Logout</button></li>
                            </ul>
                        </div>
                        :
                        <div className="w-12 text-2xl">
                            <Link to={'/login'}>
                                <button>
                                    <FaSignInAlt></FaSignInAlt>
                                </button>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;