import { useState } from "react";

import { Slider } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledSlider = styled(Slider)(({ theme }) => ({
    color: "#151C22",
    padding: "20px 0",
    "& .MuiSlider-thumb": {
        "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px ${alpha("#151C22", 0.16)}`,
        },
        "&.Mui-active": {
            boxShadow: `0px 0px 0px 14px ${alpha("#151C22", 0.16)}`,
        },
    },
    "& .MuiSlider-rail": {
        backgroundColor: "#727A82",
    },
    "& .MuiSlider-valueLabelOpen": {
        top: "auto !important",
        bottom: "-4px",
        transform: "translateY(100%) scale(1) !important",
        padding: "0 !important",
        backgroundColor: "transparent",
        "&::before": {
            visibility: "hidden",
        },
    },
    "& .MuiSlider-valueLabelCircle": {
        color: "#151C22",
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: "bold",
    },
}));

const MultiRange = (props) => {
    const [value, setValue] = useState([...props.values]);
    const minValue = props.values[0];
    const maxValue = props.values[1];
    const minDistance = (maxValue - minValue) / 4; // Min distance between labels - 25%

    const valuetext = (value) => {
        return `$ ${value}`;
    };

    const valueLabelFormat = (value) => {
        return `$${value}`;
    };

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };

    return (
        <StyledSlider
            getAriaLabel={() => "Minimum distance shift"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            min={minValue}
            max={maxValue}
            step={25}
            disableSwap
        />
    );
};

export default MultiRange;
