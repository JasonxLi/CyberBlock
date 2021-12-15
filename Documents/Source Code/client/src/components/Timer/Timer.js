import { Typography, Box } from "@material-ui/core";
import { useState, useEffect} from "react";

const Timer = ({ initialSeconds, resetTimer, setResetTimer}) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(()=>{
        if(resetTimer){
            setSeconds(initialSeconds);
            setResetTimer(false);
        }
    }, [resetTimer])


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <Box>
            {seconds === 0
                ? null
                : <Typography align='center' variant='h5'> Timer: {seconds < 10 ? `0${seconds}` : seconds} </Typography>
            }
        </Box>
    )
}

export default Timer;