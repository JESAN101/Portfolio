import { motion, AnimatePresence } from "framer-motion";
import { FaWifi } from "react-icons/fa";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

function OfflineBanner() {
  const online = useOnlineStatus();

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          role="status"
          className="fixed left-1/2 top-20 z-[55] flex -translate-x-1/2 items-center gap-3 rounded-full border border-amber-500/40 bg-amber-950/90 px-5 py-2.5 text-sm text-amber-200 shadow-xl backdrop-blur-xl"
        >
          <FaWifi className="text-amber-400" />
          You are offline. Showing cached content.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OfflineBanner;
