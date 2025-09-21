"use client";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type Props = {
  enable: boolean;
  setEnable: (enable: boolean) => void;
};

export default function JoinMeeting({ enable, setEnable }: Props) {
    const closeModal = () => setEnable(false);

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
                                    <CallLinkForm />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

const CallLinkForm = () => {
    const [link, setLink] = useState<string>("");
    const router = useRouter();

    const handleJoinMeeting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!link.trim()) {
            alert("Please enter a meeting link");
            return;
        }
        
        // Extract meeting ID from the link
        let meetingId = link.trim();
        
        // If it's a full URL, extract the ID from the end
        if (meetingId.includes('/')) {
            meetingId = meetingId.split('/').pop() || meetingId;
        }
        
        // Navigate to the facetime page with the meeting ID
        router.push(`/facetime/${meetingId}`);
    };

    return (
        <>
            <DialogTitle
                as='h3'
                className='text-lg font-bold leading-6 text-green-600'
            >
                Join FaceTime
            </DialogTitle>

            <form className='w-full' onSubmit={handleJoinMeeting}>
                <label
                    className='block text-left text-sm font-medium text-gray-700'
                    htmlFor='link'
                >
                    Enter the FaceTime link
                </label>
                <input
                    type='text'
                    name='link'
                    id='link'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className='mt-1 block w-full text-sm py-3 px-4 border-gray-200 border-[1px] rounded mb-3'
                    placeholder='Enter meeting ID or full meeting link'
                />

                <button className='w-full bg-green-600 text-white py-3 rounded mt-4'>
                    Join now
                </button>
            </form>
        </>
    );
};