// "use client"
// // Messaging.js
// import React, { useState } from 'react';
// import MessageBox from './MessageBox';
// import FullMessage from './FullMessage';

// const Messaging = () => {
 
//   const [clicked, setClicked] = useState(false); // State to track if a message box has been clicked

//   const handleMessageBoxClick = () => {
//     setClicked(true); // Set clicked to true when a message box is clicked
//   };

 
//   const message = {
//     img: 'public/avatar.svg',
//     name: 'John Doe',
//     timeAgo: '3 hours ago',
//     reason: 'Sick leave',
//     message: 'Dear sir, this is me.',
//   };

//   // Create an array of messages with the same message object
//   const messages = Array(5).fill(message);

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ flex: 1 }}>
//         {/* Render multiple identical message boxes */}
//         {messages.map((msg, index) => (
//           <MessageBox
//             key={index}
//             img={msg.img}
//             name={msg.name}
//             timeAgo={msg.timeAgo}
//             reason={msg.reason}
//             message={msg.message}
//             onClick={handleMessageBoxClick}
          
//           />
//         ))}
//       </div>
      
    
//             {clicked && (
//         <div style={{ flex: 1 }}>
//           <FullMessage/> {/* Render FullMessage component if a message box has been clicked */}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Messaging;
"use client"
// Messaging.js
import React, { useState } from 'react';
import MessageBox from './MessageBox';
import FullMessage from './FullMessage';

const Messaging = () => {
  const [selectedMessage, setSelectedMessage] = useState(null); // State to track the selected message

  const handleMessageBoxClick = (message) => {
    setSelectedMessage(message); // Update the selected message when a message box is clicked
  };

  // Define a single message object
  const message = {
    img: 'public/avatar.svg',
    name: 'John Doe',
    timeAgo: '3 hours ago',
    reason: 'Sick leave',
    message: 'Dear sir, this is me.',
  };

  // Create an array of messages with the same message object
  const messages = Array(7).fill(message);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {/* Render multiple identical message boxes */}
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            img={msg.img}
            name={msg.name}
            timeAgo={msg.timeAgo}
            reason={msg.reason}
            message={msg.message}
            onClick={() => handleMessageBoxClick(msg)} // Pass the entire message object
          />
        ))}
      </div>
      
      {selectedMessage && (
        <div style={{ flex: 1 }}>
          <FullMessage message={selectedMessage.message} name={selectedMessage.name} /> {/* Pass the selected message */}
        </div>
      )}
    </div>
  );
};

export default Messaging;

