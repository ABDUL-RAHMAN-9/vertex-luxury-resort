import { useEffect, useState } from "react";
import { CheckCircle, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const NotificationToast = ({
    message,
    isVisible,
    onClose,
}: NotificationToastProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            // Auto hide after 3 seconds
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(onClose, 300); // Wait for fade out animation
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [isVisible, onClose]);

    if (!isVisible && !show) return null;

    return (
        <div
            className={cn(
                "fixed bottom-8 right-8 z-[100] flex items-center gap-4 px-6 py-4 bg-vertex-black border-l-4 border-vertex-gold shadow-2xl transition-all duration-500 transform",
                show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
            <div className="p-2 bg-white/10 rounded-full">
                <Download className="w-5 h-5 text-vertex-gold animate-bounce" />
            </div>

            <div className="flex flex-col">
                <span className="text-white font-display tracking-wider text-sm">
                    {message}
                </span>
                <span className="text-white/50 text-xs">
                    Check your downloads folder
                </span>
            </div>

            <button
                onClick={() => setShow(false)}
                className="ml-4 text-white/40 hover:text-white transition-colors">
                <X size={18} />
            </button>
        </div>
    );
};

export default NotificationToast;
