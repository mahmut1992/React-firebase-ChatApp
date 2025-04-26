import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";

const Protected = () => {
  // aktif kullanıcı (oturumu açık) state i
  const [user, setUser] = useState(undefined);

  // aktif kullanıcı verisini al

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  // kullanıcı verisi yükleniyorsa loader bas

  if (user === undefined) return <Loader />;

  // Kullanıcı otuurumu kapalıysa logine yönlendir
  if (user === null) return <Navigate to="/" replace />;

  // kullanıcı hesabı açıksa sayfayı göster

  return <Outlet context={user} />; // outlete context ismi ile prop geçersin useOutletContext() ile yakalarsın
};

export default Protected;
