const MOBILE_BREAKPOINT = 768;
const MOBILE_UA_PATTERN = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

const isMobileUA = () => MOBILE_UA_PATTERN.test(navigator.userAgent.toLowerCase());
const isTouchDevice = () => ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < MOBILE_BREAKPOINT;

/**
 * Detects the current device type based on user agent and touch capabilities.
 * @returns {'mobile' | 'desktop'} The detected device type.
 */
export const detectDevice = () => [isMobileUA, isTouchDevice].some(fn => fn()) ? 'mobile' : 'desktop';
