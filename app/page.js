"use client";
import Image from "next/image";
import NetflixPlayer from "./components/NetflixPlayer";
import { useState } from "react";

export default function Home() {
const [url, seturl] = useState(1)

 

  return (
    <div className="w-full h-screen flex flex-col justify-center items-start bg-[#0D0D0E]">
      <NetflixPlayer src={`https://s3.ap-south-1.amazonaws.com/couple.together.innodev/KaalaPaani/KaalaPaani${url}/KaalaPaani${url}.m3u8`} />
  <div className="w-full flex overflow-x-scroll items-center h-50 space-x-4 p-5 no-scrollbar"> 
        
     
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(1)}> 
          <Image
            src="/kalapaniep1.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 1</h1>
        </div>
          <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(2)}> 
          <Image
            src="/kalapaniep1.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 2</h1>
        </div>
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(3)}> 
          <Image
            src="/kalapaniep3.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 3</h1>
        </div>
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(4)}> 
          <Image
            src="/kalapaniep4.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 4</h1>
        </div>
        
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(5)}> 
          <Image
            src="/kalapaniep5.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 5</h1>
        </div>
        
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(6)}> 
          <Image
            src="/kalapaniep6.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 6</h1>
        </div>
        
        <div className="w-48 h-[80%] min-w-[15rem] relative flex-shrink-0 cursor-pointer" onClick={() => seturl(7)}> 
          <Image
            src="/kalapaniep7.png"
            alt="Picture of the author"
            fill
            className="object-cover rounded-lg"
          />

          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">Episode 7</h1>
        </div>
      
        
      

    </div>
  </div>
  );
}
