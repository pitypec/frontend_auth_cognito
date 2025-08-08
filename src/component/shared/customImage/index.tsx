interface CustomImageProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  height?: string;
  scale?: number;
}
const CustomImage = ({
  src,
  alt,
  onLoad,
  scale,
  ...props
}: CustomImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${scale})`,
        // maxWidth: "100%",
        // minWidth: "100%",
        // minHeight: "100%",
      }}
      onLoad={() => {
        if (onLoad) {
          onLoad();
        }
      }}
      {...props}
    />
  );
};

export default CustomImage;
