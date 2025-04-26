import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Arrow = ({ isAtBottom, scrollToBottom, unreadCount }) => {
  return (
    !isAtBottom && (
      <button
        onClick={scrollToBottom}
        className=" flex items-center justify-center sticky bottom-0 end-0 ml-auto bg-zinc-300 rounded-lg hover:bg-zinc-400 transition cursor-pointer shadow-black/50 relative"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {unreadCount}{" "}
          </span>
        )}
        <MdKeyboardDoubleArrowDown className=" text-black" />
      </button>
    )
  );
};

export default Arrow;
