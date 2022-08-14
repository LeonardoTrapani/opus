import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';
import { BoldText } from '../StyledText';

const AuthSvg: React.FC<SvgProps> = (props) => {
  const originalWidth = 744;
  const originalHeight = 539.286;
  const aspectRatio = originalWidth / originalHeight;

  return (
    <Svg
      {...props}
      width='100%'
      height='100%'
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
    >
      <Path
        fill='#f2f2f2'
        d='M474.114 404.286v130H148.415c-37.109 0-67.3-29.16-67.3-65s30.191-65 67.3-65z'
      />
      <Path
        fill='#3f68e0'
        d='M482.114 533.286a5.002 5.002 0 0 1-5 5h-334.5a68.5 68.5 0 1 1 0-137h334.5a5 5 0 0 1 0 10h-334.5a58.5 58.5 0 1 0 0 117h334.5a5.002 5.002 0 0 1 5 5z'
      />
      <Path
        fill='#ccc'
        d='M474.114 434.286h-350a1 1 0 1 1 0-2h350a1 1 0 0 1 0 2zm0 24h-350a1 1 0 1 1 0-2h350a1 1 0 0 1 0 2zm0 24h-350a1 1 0 1 1 0-2h350a1 1 0 0 1 0 2zm0 24h-350a1 1 0 1 1 0-2h350a1 1 0 0 1 0 2z'
      />
      <Path
        fill='#f2f2f2'
        d='m725.832 428.757-81.565 101.228-253.615-204.35c-28.896-23.283-34.111-64.932-11.624-92.84s64.292-31.671 93.188-8.388z'
      />
      <Path
        fill='#ccc'
        d='M651.124 534.226a5.002 5.002 0 0 1-7.03.756L383.623 325.11a68.5 68.5 0 0 1 85.957-106.68l260.47 209.874a5 5 0 1 1-6.274 7.787L463.307 226.218a58.5 58.5 0 1 0-73.408 91.105l260.468 209.872a5.002 5.002 0 0 1 .757 7.031z'
      />
      <Path
        fill='#ccc'
        d='M707.009 452.117 434.471 232.52a1 1 0 1 1 1.255-1.557L708.264 450.56a1 1 0 1 1-1.255 1.557zm-15.059 18.689L419.414 251.208a1 1 0 0 1 1.255-1.557l272.538 219.597a1 1 0 1 1-1.255 1.558zm-15.057 18.688L404.355 269.897a1 1 0 0 1 1.254-1.558l272.539 219.598a1 1 0 1 1-1.255 1.557zm-15.058 18.688L389.297 288.585a1 1 0 1 1 1.254-1.557L663.09 506.625a1 1 0 1 1-1.254 1.557zM743 539.286H1a1 1 0 0 1 0-2h742a1 1 0 0 1 0 2z'
      />
      <Path
        fill='#ffb8b8'
        d='m338.081 390.622-11.432-.001-5.437-44.096 16.873.002-.004 44.095z'
      />
      <Path
        fill='#2f2e41'
        d='M318.482 387.355h22.048v13.881H304.6a13.882 13.882 0 0 1 13.882-13.881z'
      />
      <Path
        fill='#ffb8b8'
        d='m221.286 390.622-11.432-.001-5.437-44.096 16.873.002-.004 44.095z'
      />
      <Path
        fill='#2f2e41'
        d='M201.688 387.355h22.048v13.881h-35.93a13.882 13.882 0 0 1 13.882-13.881zM259.47 63.533v-5a32.25 32.25 0 0 1 32.25-32.25 32.25 32.25 0 0 1 32.25 32.25v5a23.25 23.25 0 0 1-23.25 23.25h-18a23.25 23.25 0 0 1-23.25-23.25z'
      />
      <Circle cx={291.721} cy={63.942} r={24.561} fill='#ffb8b8' />
      <Path
        fill='#ffb8b8'
        d='M158.125 148.356a9.377 9.377 0 0 1 14.28 1.677l21.054-3.983L199 158.255l-29.812 5.207a9.428 9.428 0 0 1-11.063-15.106z'
      />
      <Path
        fill='#ccc'
        d='m272.573 103.971.275.417-34.526 22.745-58.258 18.603a3.508 3.508 0 0 0-2.412 3.738l1.27 10.947a3.5 3.5 0 0 0 4.21 3.018l54.83-11.752a19.806 19.806 0 0 0 7.372-3.246l38.788-27.597a10.02 10.02 0 0 0 4.158-8.947 9.975 9.975 0 0 0-15.432-7.509z'
      />
      <Path
        fill='#2f2e41'
        d='M326.853 378.109a4.518 4.518 0 0 1-4.138-2.701l-52.41-129.501a1.5 1.5 0 0 0-2.808.158l-42.758 126.073a4.5 4.5 0 0 1-5.882 2.892l-14.338-5.377a4.489 4.489 0 0 1-2.897-3.705c-6.45-56.192 49.8-198.03 50.369-199.456l.157-.395 51.277 11.343.107.116c20.458 22.318 37.274 163.082 40.437 191.074a4.479 4.479 0 0 1-2.971 4.747l-12.657 4.476a4.457 4.457 0 0 1-1.488.256z'
      />
      <Path
        fill='#ccc'
        d='M282.673 182.006c-12.424 0-26.275-2.477-30.538-12.701l-.098-.235.132-.218c3.365-5.521 7.813-14.94 5.422-16.708-4.709-3.482-6.994-9.21-6.791-17.026.44-16.965 12-32.028 28.766-37.482a127.642 127.642 0 0 1 14.263-3.672 24.28 24.28 0 0 1 20.133 4.971 24.526 24.526 0 0 1 9.096 18.87c.175 18.132-2.616 43.384-16.913 60.721a4.448 4.448 0 0 1-2.633 1.531 122.223 122.223 0 0 1-20.84 1.949z'
      />
      <Path
        fill='#ffb8b8'
        d='M278.051 181.327a9.556 9.556 0 0 1 11.679-6.664 9.407 9.407 0 0 1 1.447.536l15.987-14.549 11.118 7.49-22.862 20.231a9.54 9.54 0 0 1-10.813 4.587 9.394 9.394 0 0 1-6.556-11.631z'
      />
      <Path
        fill='#ccc'
        d='M304.632 181.512a4.488 4.488 0 0 1-2.846-1.016l-6.304-5.151a4.5 4.5 0 0 1 .109-7.056l26.442-20.28a1.503 1.503 0 0 0 .283-2.094l-16.32-21.576a13.285 13.285 0 0 1 .887-17.115 13.248 13.248 0 0 1 17.888-1.43l.103.109 17.042 24.402a15.193 15.193 0 0 1-.36 24.186l-34.246 26.138a4.507 4.507 0 0 1-2.678.883z'
      />
      <Path
        fill='#2f2e41'
        d='M269.965 57.033V44.847l21.756-9.5 20.744 9.5v12.186a2 2 0 0 1-2 2h-38.5a2 2 0 0 1-2-2z'
      />
      <Path
        fill='#2f2e41'
        d='M290.722 27.9c-3.199-10.239 3.52-21.973 13.451-26.025s21.813-1.22 30.194 5.476 13.58 16.724 16.334 27.09 3.278 21.178 3.787 31.892c12.202 2.241 20.503 16.714 16.275 28.378s-19.872 17.46-30.677 11.363-13.935-22.485-6.137-32.134a26.374 26.374 0 0 0-30.687-40.91c-6.014 2.515-13.56-4.02-12.54-5.13z'
      />
      <Path
        fill='#3f68e0'
        d='M153.614 101.083a104.449 104.449 0 0 1-42.348-9.275 4.473 4.473 0 0 1-2.652-4.104V51.286a4.505 4.505 0 0 1 4.5-4.5h81a4.505 4.505 0 0 1 4.5 4.5v36.418a4.473 4.473 0 0 1-2.652 4.104 104.449 104.449 0 0 1-42.348 9.275z'
      />
      <Path
        fill='#3f68e0'
        d='M153.603 71.58a4.505 4.505 0 0 1-1.749-.352l-64.232-27.1a4.5 4.5 0 0 1 .154-8.352l64.232-24.368a4.484 4.484 0 0 1 3.212.007l63.372 24.367a4.5 4.5 0 0 1 .154 8.338l-63.373 27.1a4.507 4.507 0 0 1-1.77.36z'
      />
      <Circle cx={116.114} cy={88.286} r={6} fill='#3f3d56' />
      <Path
        d='m218.965 40.274-63.373 27.099a4 4 0 0 1-3.128.008l-64.232-27.1a3.925 3.925 0 0 1-1.912-1.68 3.997 3.997 0 0 0 1.912 5.68l64.232 27.1a4 4 0 0 0 3.128-.008l63.373-27.1a3.997 3.997 0 0 0 1.894-5.672 3.927 3.927 0 0 1-1.894 1.673z'
        opacity={0.2}
      />
      <Path
        fill='#3f3d56'
        d='M116.618 88.262a1 1 0 0 0 1-1v-33.46L150.6 41.785a1 1 0 0 0 .03-2L117.647 51.8a1.962 1.962 0 0 0-1.433.575 1.986 1.986 0 0 0-.597 1.425v33.461a1 1 0 0 0 1 1z'
      />
    </Svg>
  );
};

export default AuthSvg;