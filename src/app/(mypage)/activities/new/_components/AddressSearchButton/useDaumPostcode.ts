export const useDaumPostcode = () => {
  const openPostcode = (onComplete: (address: string) => void) => {
    if (!window.daum?.Postcode) {
      console.error("Daum Postcode script not loaded");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        onComplete(data.address);
      },
    }).open();
  };

  return { openPostcode };
};
