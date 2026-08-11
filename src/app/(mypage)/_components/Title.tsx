import Button from "@/components/Button/Button";

interface TitleProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Title = ({
  title,
  description,
  buttonText,
  onButtonClick,
}: TitleProps) => {
  return (
    <div className="mb-3.25 flex flex-col items-start justify-center gap-3.5 md:mb-7.5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start justify-center gap-2.5">
        <h1 className="text-18-bold text-gray-950">{title}</h1>
        <p className="text-14-medium whitespace-nowrap text-gray-500">
          {description}
        </p>
      </div>
      {buttonText && (
        <Button
          variant="mainBlue"
          height="47md"
          onClick={onButtonClick}
          className="w-full whitespace-nowrap md:w-auto"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Title;
