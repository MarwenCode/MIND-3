// import React, { useState } from 'react';
// import axios from 'axios';

// const AddFile = ({setSelectedFile, selectedFile}) => {
 
//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//       };
//   const handleFileUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       await axios.post('http://localhost:8000/api/upload', formData);

//       console.log('File uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload File</button>
//     </div>
//   );
// };

// export default AddFile;



import React, { useState } from 'react';
import axios from 'axios';

const AddFile = ({ setSelectedFile, selectedFile }) => {
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8000/api/upload', formData);
      const uploadedFileUrl = response.data.fileUrl;
      setFileUrl(uploadedFileUrl);

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>}
    </div>
  );
};

export default AddFile;
