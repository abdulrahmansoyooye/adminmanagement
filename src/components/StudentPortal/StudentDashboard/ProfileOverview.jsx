// import React, { useEffect, useRef, useState } from "react";
//  import * as htmlToImage from "html-to-image";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import loader from "../../assets/loading.png";

// const ProfileOverview = () => {
//   const [users, setUsers] = useState([]);
//   const [qrCode, setQrCode] = useState(false);
//   const [loading, setLoading] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [qrCodeImage, setQrcodeImage] = useState("");
//   const qrCodeRef = useRef(null);
//   const UsersPerPage = 2;
//   const [currentPage, setCurrenPage] = useState(1);
//   const endIndex = UsersPerPage * currentPage;

//   const startIndex = 0;
//   console.log({ startIndex, endIndex });
//   const handlePageClick = () => {
//     setCurrenPage((prev) => prev + 1);
//   };
//   useEffect(() => {
//     (async function fetchUserData() {
//       try {
//         const response = await fetch(
//           `https://studentbackendportal.onrender.com/users/`
//         );
//         const data = await response.json();
//         setUsers(data.slice(startIndex, endIndex));
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     })();
//   }, [currentPage]);

//   const navigate = useNavigate();
//   const handleSubmit = async (userId, data) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `https://studentbackendportal.onrender.com/createId/`,
//         {
//           userId,
//           qrCodeImage: JSON.stringify(data),
//         }
//       );
//       if (response.status === 201) {
//         setLoading(false);

//         navigate("/identity-cards");
//       }
//     } catch (error) {
//       setLoading(false);

//       console.log(`${error.response.data.message} Please try again`);
//     }
//   };
//   return (
//     <div className="flex flex-col gap-[1rem] w-full ">
//       <div className="flex w-full justify-center  gap-[1rem]">
//         <h2 className="text-xl font-semibold text-blue-500">
//           Pending Id Cards
//         </h2>
//       </div>
//       <div className="cursor-pointer flex justify-center  items-center w-full">
//         <input
//           type="text"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           className="p-[1rem_2rem] sm:w-[60%] w-full border  rounded-lg  "
//           placeholder="Search for a user"
//         />
//       </div>
//       <div className="flex flex-wrap gap-[1rem] justify-center items-center">
//         {users.length > 0 ? (
//           users
//             .filter(({ fullName }) =>
//               searchValue
//                 ? fullName.toLowerCase().includes(searchValue.toLowerCase())
//                 : true
//             )
//             .map(
//               ({
//                 fullName,
//                 photo,
//                 level,
//                 faculty,
//                 department,
//                 matricNumber,
//                 email,
//                 _id,
//               }) => (
//                 <div
//                   className=" rounded-md p-8 w-full  bg-white  sm:w-[40%]"
//                   key={_id}
//                 >
//                   <div className="text-center mb-8 ">
//                     <img
//                       src={
//                         `https://studentbackendportal.onrender.com/assets/${photo}` ||
//                         "https://via.placeholder.com/150"
//                       }
//                       alt="Profile"
//                       className="rounded-full w-24 h-24 mx-auto"
//                     />
//                     <h2 className="text-lg font-semibold mt-2 text-green-500">
//                       {fullName}
//                     </h2>
//                   </div>

//                   <div className="">
//                     <div className="flex-col text-sm gap-[0.5rem] text-gray-600  mb-6 flex  justify-between w-full ">
//                       <strong>Matric No</strong>{" "}
//                       <p className="w-full text-right">{matricNumber}</p>
//                     </div>
//                     <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
//                       <strong>Department</strong>{" "}
//                       <p className="text-right">{department}</p>
//                     </div>
//                     <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
//                       <strong>Faculty</strong>{" "}
//                       <p className="text-right"> {faculty}</p>
//                     </div>
//                     <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
//                       <strong>Level </strong>{" "}
//                       <p className="text-right">{level}</p>
//                     </div>
//                     <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
//                       <strong>Email </strong>{" "}
//                       <p className="text-right">{email}</p>
//                     </div>
//                   </div>
//                   <button
//                     className="blue_btn mt-[1rem] text-center items-center  justify-center w-full flex gap-[1rem] "
//                     onClick={() =>
//                       handleSubmit(_id, {
//                         fullName,
//                         photo,
//                         level,
//                         faculty,
//                         department,
//                         matricNumber,
//                         email,
//                         _id,
//                       })
//                     }
//                   >
//                     Generate Id Card & QR Code
//                   </button>
//                 </div>
//               )
//             )
//         ) : (
//           <div className="bg-blue-500 rounded-[50%] w-[40px] h-[40px]">
//             <img src={loader} className="animate-spin" alt="loader" />
//           </div>
//         )}
//       </div>
//       <div className="w-full text-center">
//         {users.length !== 0 && (
//           <div onClick={handlePageClick} className="cursor-pointer">
//             Load More
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ProfileOverview;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loading.png";

const ProfileOverview = () => {
  const [users, setUsers] = useState([]);
  const [loadingIds, setLoadingIds] = useState({}); // per-card loading
  const [searchValue, setSearchValue] = useState("");
  const UsersPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = UsersPerPage * currentPage;
  const startIndex = 0;

  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/users/`
        );
        const data = await response.json();
        setUsers(data.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, [currentPage]);

  // Load more users
  const handlePageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Request ID card
  const handleSubmit = async (userId, data) => {
    console.log("Generate button clicked!", userId, data);

    // Set loading for this specific user
    setLoadingIds((prev) => ({ ...prev, [userId]: true }));

    try {
      const response = await axios.post(
        `https://studentbackendportal.onrender.com/request/${userId}`,
        {
          qrCodeImage: JSON.stringify(data),
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("ID Card requested successfully!");
        navigate("/identity-cards");
      } else {
        console.warn("Unexpected response:", response.status);
        alert("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error generating ID card:",
        error?.response?.data?.message || error.message
      );
      alert("Failed to request ID card. Check console for details.");
    } finally {
      // Stop loading for this specific user
      setLoadingIds((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] w-full">
      <div className="flex w-full justify-center gap-[1rem]">
        <h2 className="text-xl font-semibold text-blue-500">Pending Id Cards</h2>
      </div>

      <div className="flex justify-center items-center w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-[1rem_2rem] sm:w-[60%] w-full border rounded-lg"
          placeholder="Search for a user"
        />
      </div>

      <div className="flex flex-wrap gap-[1rem] justify-center items-center">
        {users.length > 0 ? (
          users
            .filter(({ fullName }) =>
              searchValue
                ? fullName.toLowerCase().includes(searchValue.toLowerCase())
                : true
            )
            .map(
              ({
                fullName,
                photo,
                level,
                faculty,
                department,
                matricNumber,
                email,
                _id,
              }) => (
                <div className="rounded-md p-8 w-full bg-white sm:w-[40%]" key={_id}>
                  <div className="text-center mb-8">
                    <img
                      src={
                        `https://studentbackendportal.onrender.com/assets/${photo}` ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="rounded-full w-24 h-24 mx-auto"
                    />
                    <h2 className="text-lg font-semibold mt-2 text-green-500">{fullName}</h2>
                  </div>

                  <div>
                    <div className="flex-col text-sm gap-[0.5rem] text-gray-600 mb-6 flex justify-between w-full">
                      <strong>Matric No</strong>
                      <p className="w-full text-right">{matricNumber}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full justify-between">
                      <strong>Department</strong>
                      <p className="text-right">{department}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full justify-between">
                      <strong>Faculty</strong>
                      <p className="text-right">{faculty}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full justify-between">
                      <strong>Level</strong>
                      <p className="text-right">{level}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full justify-between">
                      <strong>Email</strong>
                      <p className="text-right">{email}</p>
                    </div>
                  </div>

                  <button
                    className="blue_btn mt-[1rem] text-center items-center justify-center w-full flex gap-[1rem]"
                    onClick={() =>
                      handleSubmit(_id, {
                        fullName,
                        photo,
                        level,
                        faculty,
                        department,
                        matricNumber,
                        email,
                        _id,
                      })
                    }
                    disabled={loadingIds[_id]} // disable only this button
                  >
                    {loadingIds[_id] ? "Generating..." : "Generate Id Card & QR Code"}
                  </button>
                </div>
              )
            )
        ) : (
          <div className="bg-blue-500 rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
            <img src={loader} className="animate-spin" alt="loader" />
          </div>
        )}
      </div>

      <div className="w-full text-center">
        {users.length !== 0 && (
          <div onClick={handlePageClick} className="cursor-pointer">
            Load More
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverview;

