export const paraAnim = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};
export const buttonAnim = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  transition: { type: "spring", stiffness: 60 },
};
export const imgAnim = {
  hidden: {
    opacity: 0,
  },
};
export const fadeIn = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  transition: { type: "spring", stiffness: 150 ,}
};
export const socialAnim = {
  hidden: { x: "-50%" },
  visible: { x: 0 },
};

export const leftAnim = {
  hidden : {x : '-50%'},
  visible : {x : '0'}
}

export const rightAnim = {
  hidden : {x : '50%'},
  visible : {x : '0'}
}
