export function H1({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[40px] text-[30px] md:leading-[50px] md:text-[40px] lg:leading-[60px] lg:text-[50px] 2xl:leading-[70px] 2xl:text-[60px]";

  return <h1 className={`${defaultClasses} ${className}`}>{children}</h1>;
}

export function H2({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[35px] text-[25px] md:leading-[45px] md:text-[35px] lg:leading-[55px] lg:text-[45px] 2xl:leading-[70px] 2xl:text-[60px]";

  return <h2 className={`${defaultClasses} ${className}`}>{children}</h2>;
}

export function H3({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[25px] text-[15px] md:leading-[35px] md:text-[25px] lg:leading-[45px] lg:text-[35px] 2xl:leading-[60px] 2xl:text-[50px]";

  return <h3 className={`${defaultClasses} ${className}`}>{children}</h3>;
}

export function H4({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[25px] text-[15px]  sm:leading-[10px] sm:text-[20px] lg:leading-[35px] lg:text-[25px] font-[500]";

  return <h4 className={`${defaultClasses} ${className}`}>{children}</h4>;
}

export function H5({ className = "", children }) {
  const defaultClasses =
    "font-[400] leading-[23px] text-[13px]  sm:leading-[25px] sm:text-[15px] lg:leading-[30px] lg:text-[20px] font-[500]";

  return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
}

export function H6({ className = "", children }) {
  const defaultClasses =
    "font-[400] xl:leading-[10px] xl:text-[20px] 2xl:leading=[35px] 2xl:text=[25px] font-[500]";

  return <h1 className={`${defaultClasses} ${className}`}>{children}</h1>;
}

export function Font1({ className = "", children }) {
  const defaultClasses =
    "leading-[23px] text-[13px] sm:leading-[25px] sm:text-[15px] lg:leading-[29px] lg:text-[19px]";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function Font2({ className = "", children }) {
  const defaultClasses =
    " font-normal leading-[19px] text-[11px] xl:leading-[21px] md:text-[13px]";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function Font3({ className = "", children }) {
  const defaultClasses =
    "font-normal leading-[23px] text-[13px] md:leading-[25px] md:text-[15px] font-semibold";

  return <p className={`${defaultClasses} ${className}`}>{children}</p>;
}

export function A({ className = "", children }) {
  const defaultClasses =
    "font-normal leading-[21px] text-[11px] md:leading-[23px] md:text-[13px] font-semibold";

  return <a className={`${defaultClasses} ${className}`}>{children}</a>;
}

// export function H2({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl';

//   return <h2 className={`${defaultClasses} ${className}`}>{children}</h2>;
// }

// export function H4({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-[30px] font-semibold tracking-tight lg:text-[35px]';

//   return <H4 className={`${defaultClasses} ${className}`}>{children}</H4>;
// }

// export function H4({ className = '', children }) {
//   const defaultClasses =
//     'font-nohemi scroll-m-20 text-xl font-[400] tracking-wide lg:text-[33px]';

//   return <h4 className={`${defaultClasses} ${className}`}>{children}</h4>;
// }

// export function H5({ className = '', children }) {
//   const defaultClasses =
//     'font-poppins scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl';

//   return <h5 className={`${defaultClasses} ${className}`}>{children}</h5>;
// }

// export function H6({ className = '', children }) {
//   const defaultClasses =
//     'font-inter scroll-m-20 text-[20px] font-semibold tracking-tight lg:text-[14px]';

//   return <h6 className={`${defaultClasses} ${className}`}>{children}</h6>;
// }

// export function P({ className = '', children }) {
//   const defaultClasses = 'font-inter leading-7 [&:not(:first-child)]:mt-6';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }

// export function Lead({ className = '', children }) {
//   const defaultClasses = 'font-poppins text-xl';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }

// export function Large({ className = '', children }) {
//   const defaultClasses = 'font-poppins text-lg font-semibold';

//   return <div className={`${defaultClasses} ${className}`}>{children}</div>;
// }

// export function Small({ className = '', children }) {
//   const defaultClasses = 'font-inter text-sm font-medium leading-none';

//   return <small className={`${defaultClasses} ${className}`}>{children}</small>;
// }

// export function Muted({ className = '', children }) {
//   const defaultClasses = 'font-inter text-muted-foreground text-sm';

//   return <p className={`${defaultClasses} ${className}`}>{children}</p>;
// }
