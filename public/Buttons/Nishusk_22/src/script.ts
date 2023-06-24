import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import gsap from 'https://cdn.skypack.dev/gsap@3.11.4';

enum SplatterType {
  SplatterRound,
  SplatterRing,
  SplatterStar,
  SplatterSquare,
}

enum SplatterPosition {
  X,
  Y,
}

enum SplatterTB {
  Top,
  Bottom,
}

enum SplatterLR {
  Left,
  Right,
}

type SplatterStyle = {
  top: string,
  left: string,
  transform: string,
}

type SplatterProps = {
  type: SplatterType,
  style: SplatterStyle,
}

const SplatterShapeIcon: ReactElement = (props: SplatterProps) => {
  const [display, setDisplay] = useState(true);
  const refSplatter = useRef(null);
  
  const type: SplatterType = props.type;
  const style: SplatterStyle = props.style;
  
  let className = '';
  
  if (type === SplatterType.SplatterRound) {
    className = 'splatter-round';
  } else if (type === SplatterType.SplatterRing) {
    className = 'splatter-ring';
  } else if (type === SplatterType.SplatterStar) {
    className = 'splatter-star';
  } else if (type === SplatterType.SplatterSquare) {
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
  
  return (
    <div ref={refSplatter} className={className} style={style}></div>
  );
};

const FancyExplodingButton: ReactElement = () => {
  const [splatters, setSplatters]: Array<SplatterProps> = useState([]);

  const getSizeByType: number = (type: SplatterType) => {
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
  
  const createSplatter: void = (count: number, w: number, h: number) => {
    let tmpSplatters: Array<SplatterProps> = JSON.parse(JSON.stringify(splatters));

    for (let i: number = 0; i < count; i++) {
      let type: SplatterType = Math.floor(Math.random() * 4);
      let splatterPosition: SplatterPosition = Math.round(Math.random());
      let xy: SplatterPosition = Math.round(Math.random());
      let tb: SplatterTB = Math.round(Math.random());
      let lr: SplatterLR = Math.round(Math.random());
      let xPosition: number = (xy === SplatterPosition.X)
                            ? Math.floor(Math.random() * w)
                            : (lr === SplatterLR.Left ? 0 : w);
      let yPosition: number = (xy === SplatterPosition.X)
                            ? (tb === SplatterTB.Top ? 0 : h)
                            : Math.floor(Math.random() * h);
      let size: number = getSizeByType(type);
      let scale: number = (Math.random() * 2) + 0.5;
      let style: SplatterStyle = {
        top: `calc(${yPosition}px - ${size})`,
        left: `calc(${xPosition}px - ${size})`,
        transform: `rotate(0deg) scale(${scale})`,
      };
      
      tmpSplatters.push({ type, style } as SplatterProps);
    }

    setSplatters(tmpSplatters);
  };
  
  const addSplatter: void = (evt) => {
    let elm = evt.target;
    let count = Math.floor(Math.random() * 4) + 5;
    let w = elm.clientWidth;
    let h = elm.clientHeight;
    
    createSplatter(count, w, h);
  };
  
  return (
    <button class="btn-splatter" onClick={addSplatter}>
      PRESS ME
      {splatters.map((props: SplatterProps, index: number) => {
        return (
          <SplatterShapeIcon
            type={props.type}
            style={props.style}
            key={index}
          />
        );
      })}
    </button>
  );
};

ReactDOM.render(<FancyExplodingButton />, document.querySelector('#app'));
