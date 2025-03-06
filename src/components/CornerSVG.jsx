const CornerSVG = ({ shadowDx, shadowDy, blurStdDeviation, width, height, index, cornersForm }) => (
  <svg key={index} className={`corner-${index + 1}`} xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
    <path d="M-2.74272e-07 23L0 0L11 1.31174e-07L24 2.86197e-07C24 2.86197e-07 17.5 3.5 10.5 10C3.5 16.5 -2.74272e-07 23 -2.74272e-07 23Z" fill="#332C2C" fill-opacity="0.7"/>
  </svg>
);

export default CornerSVG;