import loader from 'src/assets/loader.svg';

type LoaderProps = {
  alt: string;
};

export const Loader = ({ alt }: LoaderProps) => {
  return <img src={loader} alt={alt} />;
};
