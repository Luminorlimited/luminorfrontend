import Image from "next/image";
import Link from "next/link";
import React from "react";
import mainlogo from '@/assets/images/mainlogo.png'

const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
        <Image src={mainlogo} width={207} height={48} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
