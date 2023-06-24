import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
import gsap from 'https://cdn.skypack.dev/gsap@3.11.4';
var SplatterType;
(function (SplatterType) {
    SplatterType[SplatterType["SplatterRound"] = 0] = "SplatterRound";
    SplatterType[SplatterType["SplatterRing"] = 1] = "SplatterRing";
    SplatterType[SplatterType["SplatterStar"] = 2] = "SplatterStar";
    SplatterType[SplatterType["SplatterSquare"] = 3] = "SplatterSquare";
})(SplatterType || (SplatterType = {}));
var SplatterPosition;
(function (SplatterPosition) {
    SplatterPosition[SplatterPosition["X"] = 0] = "X";
    SplatterPosition[SplatterPosition["Y"] = 1] = "Y";
})(SplatterPosition || (SplatterPosition = {}));
var SplatterTB;
(function (SplatterTB) {
    SplatterTB[SplatterTB["Top"] = 0] = "Top";
    SplatterTB[SplatterTB["Bottom"] = 1] = "Bottom";
})(SplatterTB || (SplatterTB = {}));
var SplatterLR;
(function (SplatterLR) {
    SplatterLR[SplatterLR["Left"] = 0] = "Left";
    SplatterLR[SplatterLR["Right"] = 1] = "Right";
})(SplatterLR || (SplatterLR = {}));
const SplatterShapeIcon = (props) => {
    const [display, setDisplay] = useState(true);
    const refSplatter = useRef(null);
    const type = props.type;
    const style = props.style;
    let className = '';
    if (type === SplatterType.SplatterRound) {
        className = 'splatter-round';
    }
    else if (type === SplatterType.SplatterRing) {
        className = 'splatter-ring';
    }
    else if (type === SplatterType.SplatterStar) {
        className = 'splatter-star';
    }
    else if (type === SplatterType.SplatterSquare) {
        className = 'splatter-square';
    }
    let angle = Math.floor(Math.random() * 359) + 1;
    let toX = `${Math.cos(angle) * 3}em`;
    let toY = `${Math.sin(angle) * 3}em`;
    useEffect(() => {
        gsap.to(refSplatter.current, 0.8, {
            opacity: 0,
            translateX: toX,
            translateY: toY,
            scale: 0,
            rotate: 270,
            filter: 'blur(0.2rem)',
            onComplete: () => {
                setDisplay(false);
            },
        });
    }, [refSplatter]);
    if (!display) {
        return null;
    }
    return (React.createElement("div", { ref: refSplatter, className: className, style: style }));
};
const FancyExplodingButton = () => {
    const [splatters, setSplatters] = useState([]);
    const getSizeByType = (type) => {
        switch (type) {
            case SplatterType.SplatterRound:
            case SplatterType.SplatterSquare:
                return `${1 / 2}em`;
            case SplatterType.SplatterRing:
                return `${1.5 / 2}em`;
            case SplatterType.SplatterStar:
                return `${1.8 / 2}em`;
        }
    };
    const createSplatter = (count, w, h) => {
        let tmpSplatters = JSON.parse(JSON.stringify(splatters));
        for (let i = 0; i < count; i++) {
            let type = Math.floor(Math.random() * 4);
            let splatterPosition = Math.round(Math.random());
            let xy = Math.round(Math.random());
            let tb = Math.round(Math.random());
            let lr = Math.round(Math.random());
            let xPosition = (xy === SplatterPosition.X)
                ? Math.floor(Math.random() * w)
                : (lr === SplatterLR.Left ? 0 : w);
            let yPosition = (xy === SplatterPosition.X)
                ? (tb === SplatterTB.Top ? 0 : h)
                : Math.floor(Math.random() * h);
            let size = getSizeByType(type);
            let scale = (Math.random() * 2) + 0.5;
            let style = {
                top: `calc(${yPosition}px - ${size})`,
                left: `calc(${xPosition}px - ${size})`,
                transform: `rotate(0deg) scale(${scale})`,
            };
            tmpSplatters.push({ type, style });
        }
        setSplatters(tmpSplatters);
    };
    const addSplatter = (evt) => {
        let elm = evt.target;
        let count = Math.floor(Math.random() * 4) + 5;
        let w = elm.clientWidth;
        let h = elm.clientHeight;
        createSplatter(count, w, h);
    };
    return (React.createElement("button", { class: "btn-splatter", onClick: addSplatter },
        "PRESS ME",
        splatters.map((props, index) => {
            return (React.createElement(SplatterShapeIcon, { type: props.type, style: props.style, key: index }));
        })));
};
ReactDOM.render(React.createElement(FancyExplodingButton, null), document.querySelector('#app'));