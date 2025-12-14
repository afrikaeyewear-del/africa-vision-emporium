/**
 * WhatsApp utility functions
 */

// WhatsApp phone number (international format without +)
const WHATSAPP_NUMBER = '27638402214';

/**
 * Generate WhatsApp chat URL
 * @param message - Optional pre-filled message
 * @returns WhatsApp URL
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  return baseUrl;
}

/**
 * Open WhatsApp chat in new window/tab
 * @param message - Optional pre-filled message
 */
export function openWhatsApp(message?: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Default WhatsApp message template
 */
export const DEFAULT_WHATSAPP_MESSAGE = "Hello! I'm interested in your eyewear products. Could you please provide more information?";

