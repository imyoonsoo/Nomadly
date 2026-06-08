declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          address: string;
          roadAddress: string;
          jibunAddress: string;
          zonecode: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export {};
