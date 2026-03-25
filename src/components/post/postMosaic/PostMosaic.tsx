import { useMemo } from "react";
import styles from "./PostMosaic.module.scss";

interface PostMosaicProps {
  images: string[];
  height?: string | number;
  onImageClick: (src: string) => void;
  setShowModal: (val: boolean) => void;
}

const splitArea = (
  indices: number[],
  c1: number,
  c2: number,
  r1: number,
  r2: number,
): { col: string; row: string }[] => {
  if (indices.length === 0) return [];

  if (indices.length === 1) {
    return [{ col: `${c1}/${c2}`, row: `${r1}/${r2}` }];
  }

  if (c2 - c1 <= 1 && r2 - r1 <= 1) {
    return indices.map(() => ({
      col: `${c1}/${c2}`,
      row: `${r1}/${r2}`,
    }));
  }

  const mid = Math.ceil(indices.length / 2);

  const midCol = Math.floor((c1 + c2) / 2);
  const midRow = Math.floor((r1 + r2) / 2);

  if (c2 - c1 >= r2 - r1) {
    return [
      ...splitArea(indices.slice(0, mid), c1, midCol, r1, r2),
      ...splitArea(indices.slice(mid), midCol, c2, r1, r2),
    ];
  } else {
    return [
      ...splitArea(indices.slice(0, mid), c1, c2, r1, midRow),
      ...splitArea(indices.slice(mid), c1, c2, midRow, r2),
    ];
  }
};

const PostMosaic = ({
  images,
  height = "400px",
  onImageClick,
  setShowModal,
}: PostMosaicProps) => {
  const layout = useMemo(() => {
    if (!images.length) return [];

    return splitArea(
      images.map((_, i) => i),
      1,
      13,
      1,
      13,
    );
  }, [images]);

  if (!images.length) return null;

  return (
    <div
      className={styles.grid}
      style={{ "--mosaic-height": height } as React.CSSProperties}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={styles.cell}
          style={
            {
              "--col": layout[i]?.col || "1/13",
              "--row": layout[i]?.row || "1/13",
            } as React.CSSProperties
          }
        >
          <img
            onClick={() => {
              onImageClick(src);
              setShowModal(true);
            }}
            src={src}
            alt={`img-${i}`}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
};

export default PostMosaic;
