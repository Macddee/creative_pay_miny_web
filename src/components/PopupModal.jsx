import React from 'react'

export default function PopupModal({ id, title, children, onSubmit }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h1 className="text-3xl text-center mb-5 font-bold">{title}</h1>
                <form onSubmit={onSubmit}>
                    {children}
                    <button
                        type="submit"
                        className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </dialog>
    );
}
