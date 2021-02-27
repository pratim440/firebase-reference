import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./FirebaseFirestore.css";
import Button from "@material-ui/core/Button";
import View from "./View";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { db } from "./firebase";

function FirebaseSnapshot() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [items, setItems] = useState([]);

  //SNAPSHOT IS A REALTIME FUNCTION WHEREAS GET IS A ONE TIME FUNCTION.
  //IF YOU USE GET, YOU NEED TO UPDATE YOUR STATE EVERYTIME, WHEREAS IT IS NOT REQUIRED IN SNAPSHOT.
  //BOTH SNAPSHOT AND GET FUNCTION CODES ARE BELOW FOR CRUD APPLICATION

  //-------------------------------GET FUNCTION-------------------------------
  //BELOW CODE IS FOR SNAPSHOT FUNCTION
  useEffect(
    () =>
      db
        .collection("users")
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          setItems(querySnapshot.docs.map((doc) => doc.data()));
        }),

    []
  );

  //BELOW CODE IS FOR GET FUNCTION
  // useEffect(() => {
  //   db.collection("users")
  //     .get()
  //     .then((item) => {
  //       const users = item.docs.map((doc) => doc.data());
  //       setItems(users);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  //--------------------------------------------------------------------------

  //-------------------------DELETE FUNCTION----------------------------------
  // BELOW CODE IS FOR SNAPSHOT FUNCTION
  const handleDelete = (id) => {
    db.collection("users")
      .doc(id)
      .delete()
      .catch((err) => {
        console.log(err);
      });
  };

  //BELOW CODE IS FOR GET FUNCTION
  // const handleDelete = (id) => {
  //   db.collection("users")
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       setItems((prev) => prev.filter((element) => element.id !== id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //--------------------------------------------------------------------------

  //--------------------------EDIT FUNCTION-----------------------------------
  //BELOW CODE IS FOR SNAPSHOT FUNCTION
  const handleEdit = (id) => {
    db.collection("users")
      .doc(id)
      .update({
        name: name,
        mobile: mobile,
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setMobile("");
  };

  //BELOW CODE IS FOR GET FUNCTION
  // const handleEdit = (id) => {
  //   db.collection("users")
  //     .doc(id)
  //     .update({
  //       name: name,
  //       mobile: mobile,
  //     })
  //     .then(() => {
  //       setItems((prev) =>
  //         prev.map((element) => {
  //           if (element.id !== id) {
  //             return element;
  //           }
  //           return { name: name, mobile: mobile };
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //};
  //--------------------------------------------------------------------------

  //POST/SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    console.log(items);
    //BELOW CODE IS FOR SNAPSHOT FUNCTION
    db.collection("users")
      .doc(id) // Use .set() if you are sending your own Doc_Id
      .set({
        id: id,
        name: name,
        mobile: mobile,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // timestamp: firebase.firestore.Timestamp.now(), // alternative
      })
      //.add({ name: name, mobile: mobile })  Use .add() if you are not sending your own Doc_Id
      .catch((err) => {
        console.log(err);
      });

    //BELOW CODE IS FOR GET FUNCTION
    // db.collection("users")
    //   .doc(id)
    //   .set({
    //     id: id,
    //     name: name,
    //     mobile: mobile,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     // timestamp: firebase.firestore.Timestamp.now(), // alternative
    //   })
    //   .then(() => {
    //     setItems((prev) => [{ id: id, name: name, mobile: mobile }, ...prev]);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // setName("");
    // setMobile("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "name" ? setName(value) : setMobile(value);
  };

  return (
    <div className="container flex">
      <div className="input flex">
        <TextField
          id="outlined-basic"
          label="Name"
          autoComplete="off"
          variant="outlined"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Mobile"
          autoComplete="off"
          variant="outlined"
          value={mobile}
          name="mobile"
          onChange={handleChange}
        />
        <Button type="submit" onClick={handleSubmit} variant="contained">
          SUBMIT
        </Button>
      </div>
      <div className="viewContainer flex">
        {items?.map((user) => (
          <View
            name={user.name}
            mobile={user.mobile}
            id={user.id}
            key={user.id}
            deleteUser={handleDelete}
            editUser={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default FirebaseSnapshot;
