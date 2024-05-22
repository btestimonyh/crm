/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import gsap from "gsap";

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        gsap.fromTo('#register-form', { y: 200, opacity: 0 }, { y: 0, opacity: 1 })
    }, [])

    const closeModal = () => {
        gsap.fromTo('#register-form', { y: 0 }, { y: 200, opacity: 0, duration: .5, onComplete: () => onClose() })

    }

    return <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/50" onClick={closeModal}>
        {/* <RegisterForm id='register-form' onClose={closeModal} onAdd={onAdd} /> */}
        <div onClose={closeModal}>
            {children}
        </div>

    </div>
}

export default Modal;