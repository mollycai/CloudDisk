import logo from '@/assets/react.svg';

const Logo = () => {
  return (
    <div className="flex p-[10px]">
      <img src={logo} alt="logo" />
      <div className="text-white ml-[10px] text-xl font-bold">Cloud Disk</div>
    </div>
  );
};

export default Logo;
