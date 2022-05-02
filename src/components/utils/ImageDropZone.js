import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { useDropzone } from "react-dropzone";

function DropzoneAccepted(props) {
  const [files, setFiles] = useState(props.fileurl);
  const {
    acceptedFiles,
    // rejectedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
        // console.log(acceptedFiles);
        
        props.uploadfile(acceptedFiles)

    },
  });
//   const thumbs = files.map((file) => (
//     <div className="dz-thumb" key={file.name}>
//       <div className="dz-thumb-inner">
//         <img src={file.preview} className="dz-img" alt={file.name} />
//       </div>
//     </div>
//   ));
//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     },
//     [files]
//   );

  // const rejectedFilesItems = rejectedFiles.map(file => (
  //   <div key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </div>
  // ))

  return (
    <section className="pb-1">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <img
                    src={props.fileUrl}
                    className="image_preview_challenge"
                    alt="Preview"
                  />
      </div>
      {/* <aside>{acceptedFilesItems}</aside> */}
    </section>
  );
}
class ImageDropZone extends React.Component {

    render() {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardBody>
            <DropzoneAccepted fileurl={this.props.fileurl} uploadfile={this.props.uploadfile} />
          </CardBody>
        </Card>
      )
    }
  }
  
  export default ImageDropZone
  
