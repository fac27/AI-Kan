import { useRef, useEffect, useState } from "react";

export default function ComponentWithDynamicWidth() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null); // Will remove useState soon

  useEffect(() => {
    if (targetRef.current) {
      const { width } = targetRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, []);

  return (
    <>
      <div ref={targetRef}>This is the component whose width we want to read</div>
      {width && <div style={{ width: `${width}px` }}>This component will have the same width</div>}
    </>
  );
}
