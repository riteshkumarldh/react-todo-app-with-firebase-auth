import { useFirebase } from "../context/firebaseContext";

const Header = () => {
  const { loggingOut, user } = useFirebase();

  return (
    <header className="bg-stone-800 h-16">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex gap-2">
          <p className="text-stone-100">Hi,</p>
          <span className="text-blue-300 font-semibold">
            {user ? user.displayName : "Demo Name"}
          </span>
        </div>

        <button
          className="flex items-center bg-slate-300 py-1 px-3 rounded gap-2"
          onClick={() => loggingOut()}
        >
          <p className="uppercase font-semibold text-xs">Logout</p>
          <i className="bx bx-log-out text-xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
