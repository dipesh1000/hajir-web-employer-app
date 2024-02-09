import Image from "next/image";

const useImage = (props) => {
  const { src, height, width, alt, style, ...otherProps } = props;

  return (
    <Image
      src={src}
      height={height}
      width={width}
      alt={alt}
      style={{ ...style }}
      {...otherProps}
    />
  );
};

export default useImage;
