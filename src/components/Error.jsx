import { useState, useEffect } from 'react'

export default function Error({ message }) {
  const [showError, setShowError] = useState(false)
  // const [errorMesage, setErrorMessage] = useState("")

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 10000); // hides the error after 10 seconds
    }

    const handleClick = () => {
      setShowError(false);
    };

    // Add event listener when showError is true
    if (showError) {
      document.addEventListener('click', handleClick);
    }

    // Remove event listener when showError is false and cleanup on unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [showError]);

  return (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}.</span>
    </div>
  )
}