import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IconLink } from '../Button';

class Footer extends React.Component {
  render() {
    return (
      <footer id='footer'>
        <IconLink href='https://www.github.com/gitschwifty'>
          <SvgIcon style={{ width: '64px', height: '64px' }}>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
            </svg>
          </SvgIcon>
        </IconLink>
        <IconLink
          href='https://steemit.com/@petertag'
          style={{ paddingTop: '18px' }}
        >
          <SvgIcon style={{ width: '72.5px', height: '72.5px' }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 32 32'
            >
              <defs>
                <linearGradient id='c' x1='50%' x2='50%' y1='0%' y2='100%'>
                  <stop offset='0%' stop-color='#FFF' stop-opacity='.5' />
                  <stop offset='100%' stop-opacity='.5' />
                </linearGradient>
                <circle id='b' cx='16' cy='15' r='15' />
                <filter
                  id='a'
                  width='111.7%'
                  height='111.7%'
                  x='-5.8%'
                  y='-4.2%'
                  filterUnits='objectBoundingBox'
                >
                  <feOffset
                    dy='.5'
                    in='SourceAlpha'
                    result='shadowOffsetOuter1'
                  />
                  <feGaussianBlur
                    in='shadowOffsetOuter1'
                    result='shadowBlurOuter1'
                    stdDeviation='.5'
                  />
                  <feComposite
                    in='shadowBlurOuter1'
                    in2='SourceAlpha'
                    operator='out'
                    result='shadowBlurOuter1'
                  />
                  <feColorMatrix
                    in='shadowBlurOuter1'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0'
                  />
                </filter>
                <path
                  id='e'
                  d='M9.87 7.229c.216.037-.322 1.47-.022 3.107.26 1.403 3.507 6.836 3.373 8.7-.104 1.17-2.77 3.915-3.051 3.732-.307-.085.81-1.95.396-3.504-.482-1.812-3.34-6.496-3.337-8.564 0-1.513 2.448-3.569 2.64-3.471zm6.109-2.14c.274.047-.41 1.876-.028 3.959.33 1.792 4.473 8.72 4.301 11.095-.134 1.494-3.532 4.991-3.892 4.76-.39-.107 1.034-2.486.506-4.468-.613-2.308-4.258-8.282-4.255-10.919 0-1.931 3.122-4.55 3.368-4.426zm6.305 2.14c.216.037-.321 1.47-.022 3.107.26 1.403 3.507 6.836 3.374 8.7-.103 1.17-2.77 3.915-3.052 3.732-.306-.085.81-1.95.396-3.504-.481-1.812-3.34-6.496-3.337-8.564 0-1.513 2.45-3.569 2.641-3.471z'
                />
                <filter
                  id='d'
                  width='119%'
                  height='117.7%'
                  x='-9.5%'
                  y='-6.3%'
                  filterUnits='objectBoundingBox'
                >
                  <feOffset
                    dy='.5'
                    in='SourceAlpha'
                    result='shadowOffsetOuter1'
                  />
                  <feGaussianBlur
                    in='shadowOffsetOuter1'
                    result='shadowBlurOuter1'
                    stdDeviation='.5'
                  />
                  <feColorMatrix
                    in='shadowBlurOuter1'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.204257246 0'
                  />
                </filter>
              </defs>
              <g fill='none' fill-rule='evenodd'>
                <use fill='#000' filter='url(#a)' xlinkHref='#b' />
                <use fill='#4BA2F2' xlinkHref='#b' />
                <use
                  fill='url(#c)'
                  style={{ mixBlendMode: 'soft-light' }}
                  xlinkHref='#b'
                />
                <circle
                  cx='16'
                  cy='15'
                  r='14.5'
                  stroke='#000'
                  stroke-opacity='.097'
                />
                <g fill-rule='nonzero'>
                  <use fill='#000' filter='url(#d)' xlinkHref='#e' />
                  <use fill='#FFF' fill-rule='evenodd' xlinkHref='#e' />
                </g>
              </g>
            </svg>
          </SvgIcon>
        </IconLink>
      </footer>
    );
  }
}

export default Footer;
