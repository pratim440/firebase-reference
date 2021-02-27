import "./App.css";
import FirebaseFirestore from "./FirebaseFirestore";
import ImageUpload from "./ImageUpload";

function App() {
  return (
    <div className="App flex">
      <FirebaseFirestore />
      {/* <ImageUpload /> */}
    </div>
  );
}

export default App;
