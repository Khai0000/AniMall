import "../styles/ProductHome.css";

const EnterButtonIcon=()=>{
  return(
    <svg className="Product-category-button-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 36 33" fill="none">
      <g filter="url(#filter0_d_74_1550)">
        <path d="M5 28L16.2466 17.222C16.6574 16.8283 16.6574 16.1717 16.2466 15.778L5 5" stroke="#3C95A9" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <g filter="url(#filter1_d_74_1550)">
        <path d="M19 28L30.2466 17.222C30.6574 16.8283 30.6574 16.1717 30.2466 15.778L19 5" stroke="#3C95A9" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <defs>
        <filter id="filter0_d_74_1550" x="0" y="0" width="21.5547" height="33" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_1550"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_1550" result="shape"/>
        </filter>
        <filter id="filter1_d_74_1550" x="14" y="0" width="21.5547" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_1550"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_1550" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}

export default EnterButtonIcon;