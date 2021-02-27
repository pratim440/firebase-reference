import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./ImageUpload.css";
import { db, storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadState, setUploadState] = useState(false);
  const [items, setItems] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(
    () =>
      db.collection("imageUpload").onSnapshot((querySnapshot) => {
        setItems(querySnapshot.docs.map((doc) => doc.data()));
      }),
    []
  );

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //this is where the progress is
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //completes the function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post the image in the database
            const id = uuidv4();
            db.collection("imageUpload").doc(id).set({
              id: id,
              imgUrl: url,
              imageName: image.name,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        setProgress(0);
        setImage(null);
      }
    );
  };

  const deleteImage = (id, imageName) => {
    db.collection("imageUpload")
      .doc(id)
      .delete()
      .then(() => {
        storage.ref(`images/${imageName}`).delete();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="imgUploadContainer flex">
      <h1>Upload your Image</h1>
      <progress className="imageupload__progress" value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <Button
        type="submit"
        onClick={image ? handleClick : null}
        variant="contained"
      >
        UPLOAD
      </Button>
      <div className="imgDiv">
        {items?.map((item) => (
          <div className="imgPost flex" key={item.id}>
            <img className="img" src={item.imgUrl} alt="img" />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteImage(item.id, item.imageName)}
            >
              DELETE
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
