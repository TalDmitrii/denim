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
    const minDistance = 10;

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

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
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
            step={10}
            disableSwap
        />
    );
};

export default MultiRange;
