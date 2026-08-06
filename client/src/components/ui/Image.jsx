import { memo } from "react";

function Image({ src, alt = "", className = "", loading = "lazy", ...rest }) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      draggable={false}
      {...rest}
    />
  );
}

export default memo(Image);
