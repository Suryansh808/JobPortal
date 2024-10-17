import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Insight4 = () => {
  // const [thought, setThought] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [replyText, setReplyText] = useState({}); 


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/thoughts', { text: thought });
  //     console.log('Thought saved:', response.data);
  //     setThought(''); // Clear input field
  //     alert("your thought has been share...")
  //   } catch (error) {
  //     console.error('Error saving thought:', error);
  //   }
  // };

 

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/thoughts');
        setThoughts(response.data);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };

    fetchThoughts();
  }, []);



  // const handleReplyChange = (thoughtId, text) => {
  //   setReplyText((prev) => ({
  //     ...prev,
  //     [thoughtId]: text,
  //   }));
  // };

  // const handleReplySubmit = async (thoughtId) => {
  //   if (!replyText[thoughtId]) return; // Prevent empty replies

  //   try {
  //     const response = await axios.post(`http://localhost:5000/api/thoughts/${thoughtId}/replies`, {
  //       text: replyText[thoughtId],
  //     });

  //     // Update thoughts state with the new reply
  //     setThoughts((prev) =>
  //       prev.map((thought) => 
  //         thought._id === thoughtId ? response.data : thought
  //       )
  //     );

  //     // Clear the reply input
  //     setReplyText((prev) => ({ ...prev, [thoughtId]: '' }));
  //   } catch (error) {
  //     console.error('Error adding reply:', error);
  //   }
  // };

  const showThought = async (thoughtId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/thoughts/${thoughtId}/show`);
      setThoughts((prev) =>
        prev.map((thought) => 
          thought._id === thoughtId ? response.data : thought
        )
      );
    } catch (error) {
      console.error('Error showing thought:', error);
    }
  };
  const hideThought = async (thoughtId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/thoughts/${thoughtId}/hide`);
      setThoughts((prev) =>
        prev.map((thought) => 
          thought._id === thoughtId ? response.data : thought
        )
      );
    } catch (error) {
      console.error('Error hiding thought:', error);
    }
  };
  const showReply = async (thoughtId, replyIndex) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/thoughts/${thoughtId}/replies/${replyIndex}/show`);
      setThoughts((prev) =>
        prev.map((thought) => 
          thought._id === thoughtId ? response.data : thought
        )
      );
    } catch (error) {
      console.error('Error showing reply:', error);
    }
  };
  const hideReply = async (thoughtId, replyIndex) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/thoughts/${thoughtId}/replies/${replyIndex}/hide`);
      setThoughts((prev) =>
        prev.map((thought) => 
          thought._id === thoughtId ? response.data : thought
        )
      );
    } catch (error) {
      console.error('Error hiding reply:', error);
    }
  };
  return (
    <>
    <div>
      <h2>Your Thoughts</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 p-2">Thought</th>
            <th className="border border-gray-300 p-2">Actions</th>
            <th className="border border-gray-300 p-2">Replies</th>
            <th className="border border-gray-300 p-2">Reply Actions</th>
          </tr>
        </thead>
        <tbody>
          {thoughts.map((thought) => (
            <tr key={thought._id}>
              <td className="border border-gray-300 p-2">
                {thought.visible === "show" ? thought.text : 'Hidden'}
              </td>
              <td className="border border-gray-300 p-2">
                <button className='px-2 py-1 rounded-md text-white bg-green-700' onClick={() => showThought(thought._id)}>Show</button>
                <button className='px-2 py-1 rounded-md text-white bg-red-700' onClick={() => hideThought(thought._id)}>Hide</button>
              </td>
              <td className="border border-gray-300 p-2">
                <ul>
                  {thought.replies.map((reply, index) => (
                    <li key={index}>
                      {reply.visible === "show" ? reply.text : 'Hidden'}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                {thought.replies.map((reply, index) => (
                  <div key={index}>
                    <button className='px-2 py-1 rounded-md text-white bg-green-700' onClick={() => showReply(thought._id, index)}>Show</button>
                    <button className='px-2 py-1 rounded-md text-white bg-red-700' onClick={() => hideReply(thought._id, index)}>Hide</button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default Insight4;
