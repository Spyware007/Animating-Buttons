import React,{useState} from "react";
import classes from "./Editor.module.css";
export default function Editor(props) {
  const { displayName, value } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); 
  };

  return (
    <div className={classes.text_field}>
      <textarea
        onChange={(event) => props.onChange(event.target.value)}
        value={value}
      />

      <button
        type="button"
        style={classes.copy_button}
        onClick={handleCopy}
        onClick={() => navigator.clipboard.writeText(value)}
      >
        {isCopied ? "Copied" : `Copy ${displayName}`}
      </button>
    </div>
  );
}
