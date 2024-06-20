import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  // const [file, setFile] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(file);

    const formData = new FormData();
    // formData.append("file", file);
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "cdxzjere");
    formData.append("api-key", "615535318484878");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhoujyhxk/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" />
        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        <div
          {...getRootProps()}
          style={{
            background: "#e3e3e3",
            padding: "10px",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        {acceptedFiles[0] && (
          <img
            style={{ width: "300px" }}
            src={URL.createObjectURL(acceptedFiles[0])}
          />
        )}

        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
