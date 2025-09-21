"use client";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    Description,
    TransitionChild,
} from "@headlessui/react";
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import { Fragment, useState, Dispatch, SetStateAction } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import dynamic from "next/dynamic";



type Props = {
    enable: boolean;
    setEnable: (enable: boolean) => void;
};

export default function InstantMeeting({ enable, setEnable }: Props) {
    const [showMeetingLink, setShowMeetingLink] = useState(false);
    const [facetimeLink, setFacetimeLink] = useState<string>("");
    const client = useStreamVideoClient();
    const { user } = useUser();

    const closeModal = () => setEnable(false);

    const MeetingForm = ({
    setShowMeetingLink,
    setFacetimeLink,
}: {
    setShowMeetingLink: Dispatch<SetStateAction<boolean>>;
    setFacetimeLink: Dispatch<SetStateAction<string>>;
}) => {
    const [description, setDescription] = useState<string>("");

    const handleStartMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!client || !user) {
            alert("Please sign in first to create a meeting. Click the 'Sign In' button in the top-right corner.");
            return;
        }
        
        try {
            // Generate a simple meeting ID for now
            const id = crypto.randomUUID();
            setFacetimeLink(id);
            setShowMeetingLink(true);
        } catch (error) {
            console.error(error);
            alert("Failed to create Meeting. Please make sure you're signed in and try again.");
        }
    };

    return (
        <>
            <DialogTitle
                as='h3'
                className='text-lg font-bold leading-6 text-green-600'
            >
                Create Instant FaceTime
            </DialogTitle>

            <Description className='text-xs opacity-40 mb-4'>
                You can start a new FaceTime instantly.
            </Description>
            
            {(!client || !user) && (
                <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4'>
                    <p className='text-sm'>
                        ⚠️ Please sign in first to create a meeting. Click the "Sign In" button in the top-right corner.
                    </p>
                </div>
            )}

            <form className='w-full' onSubmit={handleStartMeeting}>
                <label
                    className='block text-left text-sm font-medium text-gray-700'
                    htmlFor='description'
                >
                    Meeting Description
                </label>
                <input
                    type='text'
                    name='description'
                    id='description'
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    className='mt-1 block w-full text-sm py-3 px-4 border-gray-200 border-[1px] rounded mb-3'
                    placeholder='Enter a description for the meeting'
                />

                <button className='w-full bg-green-600 text-white py-3 rounded mt-4'>
                    Proceed
                </button>
            </form>
        </>
    );
};

const MeetingLink = ({ facetimeLink }: { facetimeLink: string }) => {
    const [copied, setCopied] = useState<boolean>(false);
    const handleCopy = () => setCopied(true);

    return (
        <>
            <DialogTitle
                as='h3'
                className='text-lg font-bold leading-6 text-green-600'
            >
                Copy FaceTime Link
            </DialogTitle>

            <Description className='text-xs opacity-40 mb-4'>
                You can share the facetime link with your participants
            </Description>

            <div className='bg-gray-100 p-4 rounded flex items-center justify-between'>
                <p className='text-xs text-gray-500'>
                    {`${process.env.NEXT_PUBLIC_FACETIME_HOST}/${facetimeLink}`}
                </p>

                <CopyToClipboard
                    onCopy={handleCopy}
                    text={`${process.env.NEXT_PUBLIC_FACETIME_HOST}/${facetimeLink}`}
                >
                    <FaCopy className='text-green-600 text-lg cursor-pointer' />
                </CopyToClipboard>
            </div>

            {copied && (
                <p className='text-red-600 text-xs mt-2'>Link copied to clipboard</p>
            )}
        </>
    );
};

    return (
        <>
            <Transition appear show={enable} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black/75' />
                    </TransitionChild>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all text-center'>
                                    {showMeetingLink ? (
                                        <MeetingLink facetimeLink={facetimeLink} />
                                    ) : (
                                        <MeetingForm
                                            setShowMeetingLink={setShowMeetingLink}
                                            setFacetimeLink={setFacetimeLink}
                                        />
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
    
}
