interface AvatarProps {
  src: string;
  alt: string;
}
const Avatar = ({ src, alt }: AvatarProps) => (
  <img
    src={src}
    alt={alt}
    className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
  />
);

export default Avatar;
