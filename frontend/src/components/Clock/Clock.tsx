import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Tooltip from "antd/es/tooltip";
dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  date: Dayjs | Date;
  format?: string;
  interval?: number;
  relativeTime?: boolean;
  tooltip?: boolean;
}
export default function Clock({
  date,
  format = "YYYY-MM-DD(dd) HH:mm:ss",
  interval,
  relativeTime,
  tooltip,
}: Props) {
  const initialTime = useRef<Dayjs>(date instanceof Date ? dayjs(date) : date);
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (interval) {
      const timer = setInterval(() => setElapsedTime((prev) => prev + interval), interval);
      return () => clearInterval(timer);
    }
  }, [date, interval]);
  let str: string = initialTime.current.add(elapsedTime, "ms").format(format);
  let formatted: string;
  if (relativeTime) {
    formatted = dayjs().to(initialTime.current);
  } else {
    if (elapsedTime) {
      formatted = str;
    } else {
      formatted = initialTime.current.format(format);
    }
  }
  if (tooltip) {
    return <Tooltip title={str}>{formatted}</Tooltip>;
  } else {
    return <>{formatted}</>;
  }
}
