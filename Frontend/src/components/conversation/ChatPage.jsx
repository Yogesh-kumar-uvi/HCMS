import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ChatPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [dOnline, setDOnline] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const formData = {
                    userID: props.user,
                    doctorID: props.doctor
                };
                const response = await axios.get(`http://localhost:8080/conversation/api/v1/getMessages`, {
                    params: formData
                });
                if (response.data.success) {
                    response.data.doctorOnline ? setDOnline(true) :setDOnline(false);
                    setMessages(response.data.data);
                    scrollToBottom();
                } else {
                    console.error('Failed to fetch messages:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [props.user, props.doctor]);

    const sendDoctorMessage = async () => {
        try {
            const response = await axios.post('http://localhost:8080/conversation/api/v1/userSend', {
                userID: props.user,
                doctorID: props.doctor,
                message: newMessage
            });
            if (response.data.success) {
                setMessages([...messages, response.data.data]);
                setNewMessage('');
                scrollToBottom();
            } else {
                console.error('Failed to send message:', response.data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    };

    return (
        <div>
            <h4 style={{ textAlign: "center", display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center"}}> <div>Chat Page</div> {dOnline ? <div style={{height:"10px", width:'10px', backgroundColor:"green", borderRadius:"50%", marginLeft:"10px"}} ></div> : <div style={{height:"10px", width:'10px', backgroundColor:"red", borderRadius:"50%", marginLeft:"10px"}} ></div>} </h4>
            <div
                ref={chatWindowRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px',
                    overflowY: 'auto',
                    maxHeight: '400px' // Set max height to enable scrolling
                }}
            >
                {messages ? messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: message.messages.sender === 'user' ? 'blue' : 'green',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            maxWidth: '70%',
                            alignSelf: message.messages.sender === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom: '10px'
                        }}
                    >
                        {message.messages.message}
                    </div>
                )) : ""}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter message..."
                    style={{ width: "80%" }}
                /> &nbsp;
                <Button onClick={sendDoctorMessage}>Send</Button>
            </div>
        </div>
    );
};

export default ChatPage;
