"use client"
import { useState } from "react";
import { FaLink, FaVideo } from "react-icons/fa";
import InstantMeeting from "@/app/modals/InstantMeeting";
import UpcomingMeeting from "@/app/modals/UpcomingMeeting";
import CreateLink from "@/app/modals/CreateLink";
import JoinMeeting from "@/app/modals/JoinMeeting";


export default function Dashboard() {
  const [startInstantMeeting, setStartInstantMeeting] = useState<boolean>(false);
  const [joinMeeting, setJoinMeeting] = useState<boolean>(false);
  const [showUpcomingMeetings, setShowUpcomingMeetings] = useState<boolean>(false);
  const [showCreateLink, setShowCreateLink] = useState<boolean>(false);

  return (
    <>
      <button className="top-5 right-5 text-sm fixed bg-green-500 px-2 w-[150px] hover:bg-green-600 py-3 flex flex-col items-center text-white rounded-md shadow-sm cursor-pointer z-10" onClick={() => setJoinMeeting(true)}>
        <FaVideo className="mb-[3px] text-white" />
        Join Facetime
      </button>
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl text-center">Facetime</h1>
        <div className="flex flex-col">
          <button className="text-green-500 underline text-sm text-center cursor-pointer" onClick={() => setShowUpcomingMeetings(true)}>
            Upcoming Facetime
          </button>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button className="bg-gray-500 px-4 w-[200px] py-3 flex-col items-center hover:bg-gray-600 text-white rounded-md shadow-sm" onClick={() => setShowCreateLink(true)}>
            <FaLink className="mb-[3px] text-white" />
            New FaceTime
          </button>
        </div>

      </main>
      {
        startInstantMeeting && (<InstantMeeting enable={startInstantMeeting} setEnable={setStartInstantMeeting} />)
      }
      {
        showUpcomingMeetings && (<UpcomingMeeting enable={showUpcomingMeetings} setEnable={setShowUpcomingMeetings} />)
      }
      {
        showCreateLink && (
          <CreateLink enable ={showCreateLink} setEnable={setShowCreateLink}/>
        )
      }
      {
        joinMeeting && (
          <JoinMeeting enable ={joinMeeting} setEnable={setJoinMeeting}/>
        )
      }
    </>
  )
}
