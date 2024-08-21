import { useState, useEffect } from "react";

export const Clock = () => {
    const [bgImage, setBgImage] = useState('');
    const [time, setTime] = useState();

    useEffect(() => {
        async function getBgImage() {
            let src = '';
            try {
                const res = await fetch("https://api.unsplash.com/photos/random?client_id=xbACbrn1FK1mgcZIVI9lzv77YiIWGaQvFm9P_oWEi_k&query=nature&orientation=landscape");
                const data = await res.json();
                src = data.urls.full;
            } catch (err) {
                console.error("Failed to load background image", err);
                src = '/src/renderer/src/assets/bu-bg.jpg';
            }

            setBgImage(src);
        }

        getBgImage();
    }, []);

    function getTime(){
        const date = new Date()
        setTime(date.toLocaleTimeString("en-us", {timeStyle: "short"}))
    }
    
    setInterval(getTime, 1000)


    return (
        <div className="flex justify-center items-center">
            <div className="relative w-full h-[150px]">
                <img src={bgImage} className="w-full h-[150px] rounded-b-md unselectable" alt="Background" />
            </div>
            <div className="absolute z-10 backdrop-blur-lg px-2 py-1 rounded-lg">
                <h1 className="text-white font-bold text-3xl drop-shadow-md">{time}</h1>
            </div>
        </div>
    );
};
