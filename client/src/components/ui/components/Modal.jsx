import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiAlertOctagon} from "react-icons/fi";


const SpringModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  onVerify,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertOctagon />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">{title}</h3>
              <p className="text-center mb-6">{message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                  }}
                  className="bg-transparent hover:bg-red-600 hover:text-red-900 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onVerify) onVerify();
                  }}
                  className="bg-white hover:bg-green-400 hover:text-green-900 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
