// The function gets a name and returns if it is valid meaning returns boolean true/false
// by checking its type length and if the client send a name at all and even white spaces by using the trim functions:
export default function isValidName(name){
    let isValid = true;
    if (!name ||  typeof name !== "string" ||  name.length > 20 || !name.trim()){
        isValid = false;
    }
    return isValid
};


// The function gets an object room and creates a deep copy from it and delete the key socket Id from it and returns that deep copy object of the room;
export default function roomWithoutSocketId(room){
    const deepCopy = structuredClone(room);
    deepCopy.delete(ownerSocketId);
    return deepCopy;
}