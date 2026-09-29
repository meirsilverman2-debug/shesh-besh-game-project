import {io, Socket} from "socket.io-client";
import './App.css'
import { useEffect, useRef, useState } from "react";



function App() {
  const socket = useRef<Socket | null>(null)
  const [roomId, setRoomId] = useState<[string, number]>(["room-", 1])
   
  useEffect(() => {

    console.log("tryng to connect......");
    

    socket.current = io(`http://localhost:3009`)

    socket.current?.on("connect", () => {
      console.log("connected:", socket.current?.id);


    setRoomId(prev => [prev[0], (prev[1] + 1)]);
    
    
    

  socket.current?.emit("createRoom", {roomId: roomId.join("")});
      
    });
  }, []);
  
  return (
    <div>
      
    </div>
  );
};

export default App;
