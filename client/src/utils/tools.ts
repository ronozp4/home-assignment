import { PostData } from "../types";

const MAX_RAND = 10000000000;

const arrayInitAndShuffle = (size: number) => {
    const shuffle = (array: number[]) => array.sort(() => Math.random() - 0.5);
    return shuffle([...Array(size).keys()].map(i => i + 1))
}

var idOptions = arrayInitAndShuffle(10)

const getRandomId = () => {
    if (!idOptions.length) {
        idOptions = arrayInitAndShuffle(10)
    }
    return idOptions.pop() || 0
}

const getInitials = (fullName: string) => {
    return fullName.split(" ").map((n) => n[0]).join("");
}

const dateFromat = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(date); // 1/1/2023, 12:30:45 PM
    
}

const sortPostsByDate = (postA: PostData, postB: PostData ) => {
    return (new Date(postB.date)).getTime() - (new Date(postA.date)).getTime();
}

function isValidImageUrl(url: string) {
    const imageExtensions = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
  
    if (!imageExtensions.test(url)) {
      return false;
    }
  
    // Create an image element and attempt to load the image
    const img = new Image();
    img.src = url;
  
    // Check if the image has loaded successfully
    return img.complete;
  }

  function generateRandomInt() {
    return Math.floor(Math.random() * MAX_RAND);
  }


export { 
    getRandomId, 
    getInitials, 
    dateFromat, 
    sortPostsByDate, 
    isValidImageUrl,
    generateRandomInt
}