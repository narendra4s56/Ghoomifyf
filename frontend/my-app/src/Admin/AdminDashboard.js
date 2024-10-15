import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin/AdminDashboard.css'

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [support,setSupport]= useState([]);
  const [tourists, setTourists] = useState([]);
  const [guides, setGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tourists: [], guides: [] });

  // Fetch Payment Details
  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/payments')
      .then(response => setPayments(response.data))
      .catch(error => console.error('Error fetching payments:', error));
  }, []);

  //Fetch Support request details

  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/support')
    .then(responce => setSupport(responce.data))
    .catch(error => console.log('Error fetching support details', error));
  }, []);

  // Fetch All Tourists
  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/tourists')
      .then(response => setTourists(response.data))
      .catch(error => console.error('Error fetching tourists:', error));
  }, []);

  // Fetch All Guides
  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/guides')
      .then(response => setGuides(response.data))
      .catch(error => console.error('Error fetching guides:', error));
  }, []);

  // Search Handler
  const handleSearch = async () => {
    try {
      const touristSearch = await axios.get(`http://localhost:8081/api/admin/tourists/search`, {
        params: { name: searchQuery }
      });
      const guideSearch = await axios.get(`http://localhost:8081/api/admin/guides/search`, {
        params: { name: searchQuery }
      });
      setSearchResults({ tourists: touristSearch.data, guides: guideSearch.data });
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  // Remove Tourist
  const removeTourist = (id) => {
    console.log(`Removing tourist with ID: ${id}`);
    axios.delete(`http://localhost:8081/api/admin/tourists/${id}`)
      .then(() => {
        console.log(`Tourist with ID ${id} removed`);
        setTourists(tourists.filter(tourist => tourist.id !== id));
      })
      .catch(error => console.error('Error deleting tourist:', error));
  };
  //Remove Guide
  const removeGuide = (id) => {
    console.log(`Removing guide with ID: ${id}`);
    axios.delete(`http://localhost:8081/api/admin/guides/${id}`)
      .then(() => {
        console.log(`Guide with ID ${id} removed`);
        setGuides(guides.filter(guide => guide.id !== id));
      })
      .catch(error => console.error('Error deleting guide:', error));
  };
  

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or ID"
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Search Results</h3>
      <h4>Tourists</h4>
      <ul>
        {searchResults.tourists.map(tourist => (
          <li key={tourist.id}>
            Name: {tourist.name}, Email: {tourist.email}
            <button onClick={() => removeTourist(tourist.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h4>Guides</h4>
      <ul>
        {searchResults.guides.map(guide => (
          <li key={guide.id}>
            Name: {guide.name}, Email: {guide.email}
            <button onClick={() => removeGuide(guide.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Payments</h3>

      <table className="support-table">
              <thead>
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data name">{payment.payment_id}</td>
                    <td className="table-data email">{payment.amount}</td>
                    <td className="table-data category"> {payment.payment_date}</td>
                    <td className="table-data message"> {payment.status}</td>
                  </tr>
                ))}
                </tbody>
      </table>

      <h3>Support</h3>
        
      <table className="support-table">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Message</th>
                </tr>
              </thead>
              <tbody>
                {support.map((supportdata, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data name">{supportdata.name}</td>
                    <td className="table-data email">{supportdata.email}</td>
                    <td className="table-data category">{supportdata.category}</td>
                    <td className="table-data message">{supportdata.message}</td>
                  </tr>
                ))}
                </tbody>
      </table>

      <h3>All Tourists</h3>


      <table className="support-table">
              <thead>
                <tr>
                  <th className="table-header">Tourist ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Remove</th>
                </tr>
              </thead>
              <tbody>
                {tourists.map((tourist, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data name">{tourist.tourist_id}</td>
                    <td className="table-data email">{tourist.name}</td>
                    <td className="table-data category"> {tourist.email}</td>
                    <td className="table-data message"> <button onClick={() => removeTourist(tourist.tourist_id)}>Remove</button></td>
                  </tr>
                ))}
                </tbody>
      </table>

      <h3>All Guides</h3>


      <table className="support-table">
              <thead>
                <tr>
                  <th className="table-header">Guide ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Remove</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((guide, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data name">{guide.guide_id}</td>
                    <td className="table-data email">{guide.name}</td>
                    <td className="table-data category">{guide.email}</td>
                    <td className="table-data message"> <button onClick={() => removeGuide(guide.guide_id)}>Remove</button></td>
                  </tr>
                ))}
                </tbody>
      </table>
   
    </div>
  );
};

export default AdminDashboard;

































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../css/admin/AdminDashboard.css'

// const AdminDashboard = () => {
//   const [payments, setPayments] = useState([]);
//   const [tourists, setTourists] = useState([]);
//   const [guides, setGuides] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState({ tourists: [], guides: [] });

//   // Fetch Payment Details
//   useEffect(() => {
//     axios.get('http://localhost:8081/api/admin/payments')
//       .then(response => setPayments(response.data))
//       .catch(error => console.error('Error fetching payments:', error));
//   }, []);

//   // Fetch All Tourists
//   useEffect(() => {
//     axios.get('http://localhost:8081/api/admin/tourists')
//       .then(response => setTourists(response.data))
//       .catch(error => console.error('Error fetching tourists:', error));
//   }, []);

//   // Fetch All Guides
//   useEffect(() => {
//     axios.get('http://localhost:8081/api/admin/guides')
//       .then(response => setGuides(response.data))
//       .catch(error => console.error('Error fetching guides:', error));
//   }, []);

//   // Search Handler
//   const handleSearch = async () => {
//     try {
//       const touristSearch = await axios.get(`http://localhost:8081/api/admin/tourists/search`, {
//         params: { name: searchQuery }
//       });
//       const guideSearch = await axios.get(`http://localhost:8081/api/admin/guides/search`, {
//         params: { name: searchQuery }
//       });
//       setSearchResults({ tourists: touristSearch.data, guides: guideSearch.data });
//     } catch (error) {
//       console.error('Error performing search:', error);
//     }
//   };

//   // Remove Tourist
//   const removeTourist = (id) => {
//     console.log(`Removing tourist with ID: ${id}`);
//     axios.delete(`http://localhost:8081/api/admin/tourists/${id}`)
//       .then(() => {
//         console.log(`Tourist with ID ${id} removed`);
//         setTourists(tourists.filter(tourist => tourist.id !== id));
//       })
//       .catch(error => console.error('Error deleting tourist:', error));
//   };
//   //Remove Guide
//   const removeGuide = (id) => {
//     console.log(`Removing guide with ID: ${id}`);
//     axios.delete(`http://localhost:8081/api/admin/guides/${id}`)
//       .then(() => {
//         console.log(`Guide with ID ${id} removed`);
//         setGuides(guides.filter(guide => guide.id !== id));
//       })
//       .catch(error => console.error('Error deleting guide:', error));
//   };
  

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>
      
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search by name or ID"
//       />
//       <button onClick={handleSearch}>Search</button>

//       <h3>Search Results</h3>
//       <h4>Tourists</h4>
//       <ul>
//         {searchResults.tourists.map(tourist => (
//           <li key={tourist.id}>
//             Name: {tourist.name}, Email: {tourist.email}
//             <button onClick={() => removeTourist(tourist.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>

//       <h4>Guides</h4>
//       <ul>
//         {searchResults.guides.map(guide => (
//           <li key={guide.id}>
//             Name: {guide.name}, Email: {guide.email}
//             <button onClick={() => removeGuide(guide.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>

//       <h3>Payments</h3>
//       <ul>
//         {
//         payments.map(payment => (
//           <li key={payment.id}>
//             ID: {payment.payment_id}, Amount: {payment.amount}, Date: {payment.payment_date},status: {payment.status}
//           </li>
//         ))
//         }
//       </ul>

//       <h3>All Tourists</h3>
//       <ul>
//         {tourists.map(tourist => (
//           <li key={tourist.id}>
//             Name: {tourist.name}, Email: {tourist.email}
//             <button onClick={() => removeTourist(tourist.tourist_id)}>Remove</button>
//           </li>
//         ))}
//       </ul>

//       <h3>All Guides</h3>
//       <ul>
//         {guides.map(guide => (
//           <li key={guide.id}>
//             Name: {guide.name}, Email: {guide.email}
//             <button onClick={() => removeGuide(guide.guide_id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;


