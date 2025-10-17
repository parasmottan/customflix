"use client";
import Image from "next/image";
import NetflixPlayer from "./components/NetflixPlayer";
import { useState } from "react";

export default function Home() {
  const [url, seturl] = useState(1);

  return (
    <div
      // 👇 FIX 1: items-center kiya taaki video player aur episodes list center ho jayein
      className="w-full h-screen flex flex-col justify-center items-center bg-[#0D0D0E] p-4 md:p-8 lg:p-12"
    >
            {/* NetflixPlayer component, jo ab responsive ho chuka hai */}
           {" "}
      <NetflixPlayer
        src={`https://s3.ap-south-1.amazonaws.com/couple.together.innodev/KaalaPaani/KaalaPaani${url}/KaalaPaani${url}.m3u8`}
      />
       
      <div
        // 👇 FIX 2: Height ko thoda explicit aur responsive banaya
        // h-50 Tailwind mein standard class nahi hai, toh h-[20vh] ya h-[25vh] use kiya
        // space-x-6 aur padding badhaya bade screens ke liye
        className="w-full flex overflow-x-scroll items-center h-[20vh] md:h-[25vh] space-x-6 md:space-x-8 p-5 md:p-8 no-scrollbar max-w-[1500px]"
      >
                             {" "}
        {/* 👇 FIX 3: Episode Card size badhaya for better visibility on TV */} 
             {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(1)}
          style={{
            // Custom CSS to highlight selected episode in Netflix style (Optional but good for UI)
            outline: url === 1 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep1.png"
            alt="Episode 1 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 1
          </h1>
                 {" "}
        </div>
                {/* Episode 2 */}         {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(2)}
          style={{
            outline: url === 2 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep2.png"
            alt="Episode 2 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 2
          </h1>
                 {" "}
        </div>
                {/* Episode 3 */}       {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(3)}
          style={{
            outline: url === 3 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep3.png"
            alt="Episode 3 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 3
          </h1>
                 {" "}
        </div>
                {/* Episode 4 */}       {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(4)}
          style={{
            outline: url === 4 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep4.png"
            alt="Episode 4 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 4
          </h1>
                 {" "}
        </div>
                        {/* Episode 5 */}       {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(5)}
          style={{
            outline: url === 5 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep5.png"
            alt="Episode 5 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 5
          </h1>
                 {" "}
        </div>
                        {/* Episode 6 */}       {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(6)}
          style={{
            outline: url === 6 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep6.png"
            alt="Episode 6 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 6
          </h1>
                 {" "}
        </div>
                        {/* Episode 7 */}       {" "}
        <div
          className="w-48 h-[80%] min-w-[18rem] md:min-w-[20rem] relative flex-shrink-0 cursor-pointer"
          onClick={() => seturl(7)}
          style={{
            outline: url === 7 ? "3px solid white" : "none",
            transition: "outline 0.2s",
          }}
        >
                   {" "}
          <Image
            src="/kalapaniep7.png"
            alt="Episode 7 Thumbnail"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
                   {" "}
          <h1 className="text-xl text-white/60 bottom-3 left-3 absolute font-bold">
            Episode 7
          </h1>
                 {" "}
        </div>
                   {" "}
      </div>
       {" "}
    </div>
  );
}
