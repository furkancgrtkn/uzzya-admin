import { FC } from 'react';

const Loading: FC<{
  hPage?: boolean;
}> = ({ hPage }) => {
  return (
    <div
      className={`"relative flex items-center justify-center w-full ${
        hPage ? 'min-h-screen' : 'py-10'
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
