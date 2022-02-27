import * as React from "react";
import * as UAParser from "ua-parser-js";

const uaParser = new UAParser.UAParser();

// Access window.navigator.userAgent only once, this prevents browser from re-rendering
const defaultUAString = window.navigator.userAgent;

function isMobile(details) {
  return details.type === "mobile";
}

function isTouchDevice(details) {
  return ["mobile", "tablet", "wearable"].includes(details.type || "");
}

function useUA(uastring = defaultUAString) {
  return React.useMemo(() => {
    try {
      uaParser.setUA(uastring);
      return {
        os: uaParser.getOS(),
        browser: uaParser.getBrowser(),
        cpu: uaParser.getCPU(),
        device: uaParser.getDevice(),
        engine: uaParser.getEngine(),
      };
    } catch (err) {
      return null;
    }
  }, [uastring]);
}

function useDevice(uastring = defaultUAString) {
  return React.useMemo(() => {
    try {
      uaParser.setUA(uastring);
      return uaParser.getDevice();
    } catch (err) {
      return null;
    }
  }, [uastring]);
}

function useBrowser(uastring = defaultUAString) {
  return React.useMemo(() => {
    try {
      uaParser.setUA(uastring);
      return uaParser.getBrowser();
    } catch (err) {
      return null;
    }
  }, [uastring]);
}

function useCPU(uastring = defaultUAString) {
  return React.useMemo(() => {
    try {
      uaParser.setUA(uastring);
      return uaParser.getCPU();
    } catch (err) {
      return null;
    }
  }, [uastring]);
}

function useEngine(uastring = defaultUAString) {
  return React.useMemo(() => {
    try {
      uaParser.setUA(uastring);
      return uaParser.getEngine();
    } catch (err) {
      return null;
    }
  }, [uastring]);
}

export {
  useUA,
  useDevice,
  useBrowser,
  useCPU,
  useEngine,
  isMobile,
  isTouchDevice,
};
