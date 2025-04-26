import { auth } from "../firebase";

const Message = ({ item }) => {
  // mesajı aktif kullanıcı attıysa
  if (item.author.id === auth.currentUser.uid) {
    return (
      <p className="bg-black text-white rounded-[7px_7px_0_7px] self-end message ">
        {item.text}{" "}
      </p>
    );
  }

  // eğer mesajı başka kullanıcı attıysa
  return (
    <div className="flex items-start gap-1">
      <img
        className="size-[40px] rounded-full "
        src={item?.author?.photo}
        alt={item.author.name}
      />
      <div className="flex flex-col gap-1 w-full">
        <span className="font-semibold whitespace-nowrap text-zinc-700">
          {item.author.name}{" "}
        </span>
        <p className="message text-zinc-800 bg-zinc-200 rounded-[0_7px_7px_7px] ">
          {item.text}{" "}
        </p>
      </div>
    </div>
  );
};

export default Message;
