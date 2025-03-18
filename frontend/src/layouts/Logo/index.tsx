import logo from '@/assets/react.svg';

const Logo = () => {
  return (
    <div className="flex p-[10px]">
      <img src={logo} alt="logo" />
      <div className="ml-[10px] text-xl font-bold text-white">Cloud Disk</div>
    </div>
  );
};

export default Logo;
