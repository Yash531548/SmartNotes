'use client'

import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'


const NoteModel = ({ open, setOpen, note }) => {

    const dialogRef = useRef(null)

    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => setOpen(false)}
                initialFocus={dialogRef}
            >
                {/* Overlay */}
                <Transition
                    show={open}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">

                        {/* Modal Content */}
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                ref={dialogRef}
                                className="w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-2xl mx-auto transform overflow-hidden bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="note-title"
                            >
                                <div className="flex justify-between items-start">
                                    <h3
                                        id="note-title"
                                        className="text-lg font-semibold text-gray-900 dark:text-white"
                                    >
                                        {note.title}
                                    </h3>
                                    <button onClick={() => setOpen(false)} aria-label="Close modal">
                                        <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white" />
                                    </button>
                                </div>

                                <div className="mt-4 h-full sm:max-h-[60vh] overflow-y-auto text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: note.note }} />
                                </div>

                                <div className="mt-6 text-right sm:hidden">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default NoteModel
