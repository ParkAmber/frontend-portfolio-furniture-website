// import {
//   UploadButton,
//   UploadFileHidden,
//   UploadImage,
// } from "./Uploads01.styles";
// import type { IUploads01UIProps } from "./Uploads01.types";

// export default function Uploads01UI(props: IUploads01UIProps): JSX.Element {
//   return (
//     <>
//       {props.fileUrl !== "" ? (
//         <UploadImage
//           onClick={props.onClickUpload}
//           src={`https://storage.googleapis.com/${props.fileUrl}`}
//         />
//       ) : (
//         <UploadButton onClick={props.onClickUpload}>
//           <>+</>
//           <>Upload</>
//         </UploadButton>
//       )}
//       <UploadFileHidden
//         type="file"
//         ref={props.fileRef}
//         onChange={props.onChangeFile}
//       />
//     </>
//   );
// }
export default function UI() {
  return <div>hi</div>;
}
