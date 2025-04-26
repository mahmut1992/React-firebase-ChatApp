import { Link } from "react-router-dom";

const Header = ({ user, room }) => {
  return (
    <header className="flex justify-between items-center p-5 border border-gray-200 shadow-lg">
      <img
        src={user.photoURL}
        alt="profil-photo"
        className="size-10 rounded-full"
        referrerPolicy="no-referrer"
      />
      <p>{user.displayName} </p>
      <p className="font-semibold">{room} odası</p>
      <Link to="/room">
        <button>Farklı Oda</button>
      </Link>
    </header>
  );
};

export default Header;
