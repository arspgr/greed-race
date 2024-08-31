import { FC, useMemo } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
    expiryTimestamp: Date;
}

export const DisplayTimer: FC<Props> = props => {
    const { expiryTimestamp } = props;

    const { seconds, hours, minutes, days } = useTimer({ expiryTimestamp });

    const hoursStr = useMemo(() => {
        const hoursTotal = days * 24 + hours;
        return addLeadingZero(hoursTotal);
    }, [hours, days]);
    const minutesStr = useMemo(() => addLeadingZero(minutes), [minutes]);
    const secondsStr = useMemo(() => addLeadingZero(seconds), [seconds]);

    return (
        <span>{hoursStr}:{minutesStr}:{secondsStr}</span>
    );
}

function addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
}