import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const RoomPage = () => {
  const user = useOutletContext();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputtaki girdiyi al

    const room = e.target[0].value.toLowerCase().split(" ").join("-"); //split(" ").join("-")===replaceAll(" ","-")

    // Kullanıcıyı sohbet odasına yönlendir
    navigate(`/chat/${room}`);
  };

  // Oturumu kapat
  const handleLogout = () => {
    signOut(auth);
    toast.info("Odadan çıkış yapıldı");
  };

  return (
    <div className="wrapper">
      <form
        onSubmit={handleSubmit}
        className="box rounded-[10px] flex flex-col gap-10 text-center "
      >
        <h1 className="text-4xl">Chat Odası</h1>
        <p className="text-zinc-500">
          Selam {user.displayName}, <br /> Hangi Odaya Gireceksin ?
        </p>
        <input
          placeholder="Örn : Ses Odası"
          type="text"
          className="border border-gray-300 rounded-md shadow-lg p-2 px-4"
        />
        <button className="bg-zinc-700 text-white" type="submit">
          Odaya Gir
        </button>
        <button
          className="bg-red-500 text-white"
          type="button"
          onClick={handleLogout}
        >
          Çıkış Yap
        </button>
      </form>
    </div>
  );
};

export default RoomPage;
