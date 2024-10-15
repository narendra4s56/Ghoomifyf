// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { server } from "../server";
// import Payment from "../Payment/Payment";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const customMessage = encodeURIComponent(
//     "Hello! I've successfully booked your tour."
//   );
//   // const [booking_id, setBooking_id] = useState('');

//   useEffect(() => {
//     const tourist_id = localStorage.getItem("tourist_id");

//     if (tourist_id) {
//       axios
//         .get(`${server}/notifications/${tourist_id}`)
//         .then((response) => {
//           console.log("Notifications data:", response.data);
//           setNotifications(response.data);
//         })
//         .catch((err) => {
//           console.error("Error fetching notifications:", err);
//           setError("Failed to fetch notifications.");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setError("Tourist ID not found.");
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div className="notifications">
//       <h3>Notifications</h3>
//       {loading && <p>Loading notifications...</p>}
//       {error && <p>{error}</p>}
//       {notifications.length > 0 ? (
//         <ul>
//           {notifications.map((notification) => (
//             <li
//               key={notification.notification_id}
//               className={notification.is_read ? "read" : "unread"}
//             >
//               {notification.message}

//               {notification.booking_status !== "accepted" ? (
//                 <></>
//               ) : (
//                 <>
//                   {notification.status === "completed" ? (
//                     // Render Chat button if payment is completed
//                     <button
//                       onClick={() =>
//                         (window.location.href = `https://wa.me/${notification.guide_contact_number}?text=${customMessage}`)
//                       }
//                       style={{ backgroundColor: "green", color: "white" }}
//                     >
//                       Chat with Guide
//                     </button>
//                   ) : (
//                     // Render Pay button if payment is not done
//                     <Payment
//                       noti_id={notification.notification_id}
//                       guidePhoneNumber={notification.guide_contact_number}
//                       tourist_name={notification.tourist_name}
//                       touristPhoneNumber={notification.tourist_contact_number}
//                       touristEmail={notification.tourist_email}
//                       amount={50000} // You can dynamically set the amount if needed
//                     />
//                   )}
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !loading && <p>No notifications available.</p>
//       )}
//     </div>
//   );
// }

// export default Notifications;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../server";
import Payment from "../Payment/Payment";
import Reviewhelper from "./Reviewhelper";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const customMessage = encodeURIComponent(
    "Hello! I've successfully booked your tour."
  );

  useEffect(() => {
    const tourist_id = localStorage.getItem("tourist_id");

    if (tourist_id) {
      axios
        .get(`${server}/notifications/${tourist_id}`)
        .then((response) => {
          console.log("Notifications data:", response.data);
          setNotifications(response.data);
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
          setError("Failed to fetch notifications.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Tourist ID not found.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      {loading && <p>Loading notifications...</p>}
      {error && <p>{error}</p>}
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.notification_id}
              className={notification.is_read ? "read" : "unread"}
            >
              {notification.message}
              {(() => {
                if (notification.booking_status === "declined") {
                  return null;
                } else if (notification.booking_status === "completed") {
                  return (
                    <Reviewhelper bookingId={notification.booking_id} />
                  );
                } else {
                  if (notification.status === "completed") {
                    return (
                      <button
                        onClick={() =>
                          (window.location.href = `https://wa.me/${notification.guide_contact_number}?text=${customMessage}`)
                        }
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Chat with Guide
                      </button>
                    );
                  } else {
                    return (
                      <Payment
                        noti_id={notification.notification_id}
                        guidePhoneNumber={notification.guide_contact_number}
                        tourist_name={notification.tourist_name}
                        touristPhoneNumber={notification.tourist_contact_number}
                        touristEmail={notification.tourist_email}
                        amount={50000} // Dynamically set the amount if needed
                      />
                    );
                  }
                }
              })()}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No notifications available.</p>
      )}
    </div>
  );
}

export default Notifications;

