import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import Message from "./Message";
import Arrow from "./Arrow";

const List = ({ room, user }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const containerRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(null);
  const prevMessagesLength = useRef(0);
  const audioRef = useRef(new Audio("/notify.wav"));
  //veri tabanından mesajları al
  useEffect(() => {
    const collectionRef = collection(db, "messages");

    // Sorgu ayarlarını yap

    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // mesajlar kolleksiyonuna abone ol (değişiklikleri izle)
    // kolleksiyondaki her değişiklikte fonk bize dökümanları getirir
    const unsub = onSnapshot(q, (snapshot) => {
      // dökümanları ge.ici olarak tutulduğu dizi
      const temp = [];
      // dökümanları dönüp içerisindeki dataları diziye aktar
      snapshot.docs.forEach((doc) => temp.push(doc.data()));

      // dökümanları state aktar
      setMessages(temp);
    });
    // componontWillUmmount (component ekrandan ayrılınca çalışır)
    return () => {
      unsub();
    };
  }, []);
  // her yeni mesaj atıldığında scrool aşağı kaymalı
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      // kullanıcı yukardayken mesaj gelirse unread sayısını artır

      if (messages.length > prevMessagesLength.current && !isAtBottom) {
        // eğer son mesajı gönderen kullanıcı kendisi değilse
        if (lastMsg.author.id !== user?.uid) {
          setUnreadCount((prev) => prev + 1);

          playSound();
        }
      }
      prevMessagesLength.current = messages.length;
      if (lastMsg.author.id === user?.uid) {
        // eğer son mesajı aktif kullanıcı attıysa her koşulda scrolu aşağı kaydır
        scrollToBottom();
      } else if (isAtBottom) {
        // eğer son mesajı farklı kullanıcı attıysa kullanıcı aşağıdaysa scrolu kaydır
        scrollToBottom();
      }
    }
  }, [messages]);
  // Kuulanıcı konumu aşağıda mı değil mi
  const handleScroll = () => {
    // scrollTop:Kullanıcı yukarıdan itibaren ne kadar kaydır
    // clientHeight:Kullanıcının ekranda gördüğü ksımın yüksekliği
    // scrollHeight:Tüm içeriğin yüksekliği
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 50);
  };
  // kullanıcıyı en aşağıya kaydırır

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadCount(0);
  };
  // mesaj bildirim sesi

  const playSound = () => {
    audioRef.current.currentTime(0);
    audioRef.current.play();
  };

  return (
    <main
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 p-3 flex flex-col gap-3 w-full overflow-y-auto relative"
    >
      {messages.length < 1 ? (
        <div className="h-full grid place-items-center text-zinc-400">
          <p>Sohbete İlk Mesajı Gönderin</p>
        </div>
      ) : (
        messages.map((i, key) => <Message key={key} item={i} />)
      )}
      <div ref={lastMessageRef} />
      <Arrow
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        unreadCount={unreadCount}
      />
    </main>
  );
};

export default List;
