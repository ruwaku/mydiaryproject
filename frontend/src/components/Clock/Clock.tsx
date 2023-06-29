import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

interface Props {
  date?: Date;
  format: string;
  interval: number;
}
export default function Clock({ date, format, interval }: Props) {
  const initialTime = useRef<dayjs.Dayjs>(dayjs(date ?? new Date()));
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (interval) {
      const timer = setInterval(() => setElapsedTime((prev) => prev + interval), interval);
      return () => clearInterval(timer);
    }
  }, [date, interval]);
  if (elapsedTime) {
    return <>{initialTime.current.add(elapsedTime, "ms").format(format)}</>;
  } else {
    return <>{initialTime.current.format(format)}</>;
  }
}
