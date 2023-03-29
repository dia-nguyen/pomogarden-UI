function Modal({ children, closeModal, title }) {
  return (
    <div className="w-full h-full absolute flex justify-center items-center z-10">
      <div className="relative bg-white rounded-lg shadow relative w-1/3 z-20 p-10 min-w-fit m-2">
        <div className="flex items-start justify-between border-bottom pb-3">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 bg-transparent text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>

          </button>
        </div>
        {children}
      </div>
      <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 backdrop-blur"></div>
    </div>
  );
}

export default Modal;
