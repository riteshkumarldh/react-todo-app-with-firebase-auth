import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// context
import { useFirebase } from "../context/firebaseContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { createUser, signinWithGoogle, isLoggedIn, loading, setLoading } =
    useFirebase();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !userName) return;
    // signup
    createUser(email, password, userName);
    setEmail("");
    setPassword("");
    setUserName("");
  };

  useEffect(() => {
    setLoading(true);
    if (isLoggedIn) {
      navigate("/");
    }
    setLoading(false);
  }, [isLoggedIn, navigate, setLoading]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <section className="lg:grid lg:grid-cols-2 lg:gap-5">
          <div className="hidden lg:block bg-blue-200">
            <div className="grid place-content-center h-screen">
              <h2 className="text-3xl mb-5 text-blue-700 font-semibold">
                Are you Already Registered ?
              </h2>
              <Link
                to="/login"
                className="bg-blue-500 py-4 text-blue-100 font-medium text-xl uppercase text-center rounded-md"
              >
                Login here
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center h-screen px-5">
            <h2 className="text-left text-4xl mb-5 font-bold text-blue-950">
              Register Page
            </h2>
            <div className="mb-5">
              <h1 className="font-medium text-4xl mb-1">Hello!!</h1>
              <p className="text-sm font-normal">Signup to get Started</p>
            </div>
            <form onSubmit={handleSignup}>
              <div className="h-10 relative rounded overflow-hidden">
                <input
                  className="h-full w-full pl-8 pr-2 placeholder:text-gray-400 outline-none border border-blue-400 focus:border-2 rounded transition-all"
                  type="text"
                  placeholder="Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <button className="absolute top-1/2 -translate-y-1/2 left-2 opacity-50">
                  <i className="bx bxs-user"></i>
                </button>
              </div>
              <div className="h-10 relative my-5 rounded overflow-hidden">
                <input
                  className="h-full pl-8 pr-2 placeholder:text-gray-400 w-full outline-none border border-blue-400 focus:border-2 rounded transition-all"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="absolute top-1/2 -translate-y-1/2 left-2 opacity-50">
                  <i className="bx bxs-envelope"></i>
                </button>
              </div>
              <div className="h-10 relative rounded overflow-hidden">
                <input
                  className="h-full pl-8 pr-2 placeholder:text-gray-400 w-full outline-none border border-blue-400 focus:border-2 rounded transition-all"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="absolute top-1/2 -translate-y-1/2 left-2 opacity-50">
                  <i className="bx bxs-lock-alt"></i>
                </button>
              </div>

              <button
                type="submit"
                className="bg-blue-500 w-full mt-5 py-3 rounded-md text-blue-100 font-bold uppercase text-lg"
              >
                Register
              </button>
            </form>
            <p className="my-5 text-center uppercase font-bold">or</p>
            <button
              className=" bg-red-500 text-red-100 py-4 rounded-md font-medium uppercase"
              onClick={() => signinWithGoogle()}
            >
              Signin With Google
            </button>

            <div className="flex gap-2 justify-center mt-5">
              <p>Already Registered then </p>
              <Link className="text-blue-800 underline" to="/login">
                Login here
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
