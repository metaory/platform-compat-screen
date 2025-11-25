import init from './index.js';

const SCRIPT_NAMES = ['platform-compat-screen', 'device-capability-screen', 'device-check-screen'];
const findScript = () => Array.from(document.getElementsByTagName('script'))
  .find(s => SCRIPT_NAMES.some(name => s.src?.includes(name)));

const parseQueryParams = () => {
  const script = findScript();
  if (!script) return {};

  const params = Object.fromEntries(new URL(script.src, window.location.href).searchParams);
  const targetKeys = ['mobile', 'desktop'];
  
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (targetKeys.includes(key) && value === 'true') acc.target = key;
    if (key === 'mode') acc.mode = value;
    if (key === 'message') acc.message = decodeURIComponent(value);
    return acc;
  }, {});
};

init(parseQueryParams());
