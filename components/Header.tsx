import plusSign from '@root/public/plus.svg';
import Image from 'next/image';

type Props = {
  refresh: () => void
  toggleModal: () => void
};

const Header = ({ refresh, toggleModal }: Props) => (
  <header className="px-6 p-4 w-full max-w-4xl flex justify-end items-center">
    <button
      className="invert hover:invert-50 active:invert-50"
      type="button"
      onClick={refresh}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
      >
        <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
      </svg>
    </button>
    <button
      className="flex pl-4"
      type="button"
      onClick={toggleModal}
    >
      <Image
        className="invert hover:invert-50 active:invert-50"
        width="40px"
        height="40px"
        src={plusSign}
        alt="Add new Todo item"
      />
    </button>
  </header>
);

export default Header;
