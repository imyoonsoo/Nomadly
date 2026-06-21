import "client-only";

const KAKAO_MAPS_SCRIPT_ID = "kakao-maps-sdk";

let kakaoMapsPromise: Promise<void> | null = null;

const getKakaoMapsScriptUrl = () => {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  if (!appKey) {
    throw new Error("NEXT_PUBLIC_KAKAO_MAP_KEY is not configured.");
  }

  const scriptUrl = new URL("https://dapi.kakao.com/v2/maps/sdk.js");
  scriptUrl.searchParams.set("appkey", appKey);
  scriptUrl.searchParams.set("libraries", "services");
  scriptUrl.searchParams.set("autoload", "false");

  return scriptUrl.toString();
};

const loadKakaoMapsSdk = () => {
  const kakaoWindow = window as Window & {
    kakao?: { maps?: unknown };
  };

  if (kakaoWindow.kakao?.maps) {
    return Promise.resolve();
  }

  if (kakaoMapsPromise) {
    return kakaoMapsPromise;
  }

  kakaoMapsPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      KAKAO_MAPS_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => {
      if (kakaoWindow.kakao?.maps) {
        resolve();
        return;
      }

      kakaoMapsPromise = null;
      reject(new Error("Kakao Maps SDK did not initialize."));
    };

    const handleError = () => {
      script.remove();
      kakaoMapsPromise = null;
      reject(new Error("Failed to load Kakao Maps SDK."));
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = KAKAO_MAPS_SCRIPT_ID;
      script.src = getKakaoMapsScriptUrl();
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return kakaoMapsPromise;
};

export default loadKakaoMapsSdk;
