import React, { useRef, useState, useContext } from "react";
import "./profileInfo.css";
import AddIcon from "@mui/icons-material/Add";
import axios2 from "../../tools/axios2";
import Swal from "sweetalert2";
import "animate.css";
import { AuthContextProvider } from "../../context/AuthContext2";

function ProfileInfo({ user }) {
  //const { loggedUser } = useContext(AuthContextProvider);

  const favCity = useRef();

  const [userFavCity, setFavCity] = useState(user.favCity);

  console.log("PROFILEINFO ...user>>>>>>>", user._id);

  const alert = (newFavCity) => {
    if (!favCity.current.value || favCity.current.value === userFavCity) {
      Swal.fire(
        `${
          !favCity.current.value
            ? "You more boring than Berghain with lights on"
            : "same place again? do you ever travel?"
        }`,
        `${
          !favCity.current.value ? "the field was empty" : "enter a new place"
        }`,
        "question"
      );
    } else {
      Swal.fire({
        title: `Do you want "${newFavCity}" as your fav city?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setFavCity(newFavCity);
          editProfile({ favCity: favCity.current.value, userId: user._id });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const editProfile = async (newText) => {
    try {
      const modifyUser = await axios2.put(`/users/${user._id}`, newText);

      console.log(`user UPDATED`, modifyUser.data.favCity); //ASK porque esta pasando eso de que envia en respuesta el valor previo?
    } catch (error) {
      console.log(`ErrorMessage>>>`, error.message);
    }
  };
  //REVIEW cuando click enviar, recibo el actual valor de MONGODB.Si envio uno nuevo, recibo el anterior modificad.

  const modifyField = (e) => {
    e.preventDefault();
    // editProfile({ favCity:favCity.current.value, userId: "61747f4f31d1c57afb187990"  })

    const newFavCity = favCity.current.value;
    // setFavCity(newFavCity)  //ASK esto es hacer trampa?!?!
    alert(newFavCity);
  };

  return (
    <>
      <h4 className="profileTitle">User Information</h4>
      <div className="profileInfo">
        <div className="profileInfoItem">
          <span className="profileInfoField">Fav City: </span>
          <span className="profileInfoValue">{userFavCity || "No tengo"}</span>
          {/* ASK which Better? ternary or Logical?  */}
          <form onSubmit={modifyField}>
            <input
              className="profileInput"
              // placeholder={`${user.favCity}`}
              // placeholder={`${user.favCity}`? `${user.favCity}` : "enter your favCity"}
              placeholder={userFavCity ? userFavCity : "enter your favCity"}
              type="text"
              ref={favCity}
            />
            <button type="submit">{userFavCity ? "edit" : "add"}</button>
          </form>
        </div>
        <div className="profileInfoItem">
          <span className="profileInfoField">From: </span>
          <span className="profileInfoValue">Salamanca</span>
        </div>
        <div className="profileInfoItem">
          <span className="profileInfoField">Email </span>
          <span className="profileInfoValue">{user.email}</span>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
