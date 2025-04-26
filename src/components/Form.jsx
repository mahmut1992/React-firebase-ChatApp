import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import EmojiPicker from "emoji-picker-react";

const Form = ({ user, room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const emojiPickerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // mesajın kaydedileceği kolleksiyonun referansını al

    // formu temizle aşağıda ki await fonk beklediği için yarım sn falan sonra temizlenmesin diye burda
    setText("");
    setIsOpen(false);

    const collectionRef = collection(db, "messages");

    // mesajı veritabanındaki messages koleksiyonuna ekle

    await addDoc(collectionRef, {
      text,
      room,
      author: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };
  // inputtaki seçili alana emoji ekle
  const handleEmojiClick = (e) => {
    const input = document.querySelector("input[type='text']");
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newText = text.substring(0, start) + e.emoji + text.substring(end);
      setText(newText);
    }
  };
  // emojiPicker dışına tıkladığında modalı kapat

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // 🧽 Component unmount olunca event kaldır
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 border border-gray-200 shadow-lg flex justify-center gap-3"
    >
      <input
        value={text}
        placeholder="Mesajınızı yazınız..."
        type="text"
        className="border border-gray-200 shadow-sm p-2 px-4 rounded-md w-1/2"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="relative">
        {isOpen && (
          <div
            ref={emojiPickerRef}
            className="absolute top-[-470px] right-[-140px] "
          >
            <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          😀
        </button>
      </div>
      <button
        disabled={text.length < 1}
        type="submit"
        className="bg-black text-white rounded-md disabled:brightness-75"
      >
        Gönder
      </button>
    </form>
  );
};

export default Form;
