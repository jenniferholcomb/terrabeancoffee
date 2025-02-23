const CornerSVG = ({ shadowDx, shadowDy, blurStdDeviation, width, height, index }) => (
  <svg key={index} className={`corner-${index + 1}`} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 31" fill="none">
    <g filter="url(#corner-shadow)">
      <path
        d="M2 25L2 2L13 2L26 2C26 2 19.5 5.5 12.5 12C5.5 18.5 2 25 2 25Z"
        fill="#332C2C"
        fillOpacity="0.7"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter id="corner-shadow" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={shadowDx} dy={shadowDy} />
        <feGaussianBlur stdDeviation={blurStdDeviation} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default CornerSVG;