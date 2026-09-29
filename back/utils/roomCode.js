

// This function gets nothing and returns a generated room code with 6 letters each randomly chosen from a specific string: 
export default function generateRoomCode(){
    let roomCode = "";
    const charcters = "ABCDEFGHJKLMNPQRSTUWXYZ23456789";
    for(let i = 0; i < 6; i++){
        roomCode += charcters[Math.floor(Math.random() * charcters.length)]
    }
    return roomCode;

}