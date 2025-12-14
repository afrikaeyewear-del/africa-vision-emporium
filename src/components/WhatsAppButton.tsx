import { openWhatsApp, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/utils/whatsapp";
import whatsappIcon from "@/assets/whatsapp.png";

const WhatsAppButton = () => {
  return (
    <button
      onClick={() => openWhatsApp(DEFAULT_WHATSAPP_MESSAGE)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 lg:w-16 lg:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce-subtle hover:scale-110 p-2"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="w-full h-full object-contain"
      />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </button>
  );
};

export default WhatsAppButton;

