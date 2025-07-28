import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

const Component1 = (props) => {
  const translate = useTranslations()
  return (
    <>
      <div className={`component1-container1 ${props.rootClassName} `}>
        <span className="component1-text1">
          {props.text1 ?? (
            <Fragment>
              <span className="component1-text2">
                <span
                  dangerouslySetInnerHTML={{
                    __html: translate.raw('text_uAVgcL'),
                  }}
                ></span>
              </span>
            </Fragment>
          )}
        </span>
        <div className="component1-container2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="component1-icon1"
          >
            <path
              d="M19 12H5m14 0l-4 4m4-4l-4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <style jsx>
        {`
          .component1-container1 {
            width: 100%;
            height: 100%;
            display: flex;
            overflow: 1;
            position: relative;
            max-width: 158px;
            min-width: 110px;
            min-height: 216px;
            align-items: flex-end;
            padding-top: var(--dl-layout-space-unit);
            border-color: #ffff00;
            border-style: dashed;
            border-width: 2px;
            padding-left: var(--dl-layout-space-halfunit);
            flex-direction: column;
            background-size: cover;
            justify-content: space-between;
            background-image: url('/стиралки/image%203823000-1500h.png'),
              url('https://play.teleporthq.io/static/svg/placeholders/no-image.svg'),
              url('https://play.teleporthq.io/static/svg/placeholders/no-image.svg'),
              url('https://play.teleporthq.io/static/svg/placeholders/no-image.svg'),
              url('/стиралки/image%203823000-1500h.png'),
              url('https://play.teleporthq.io/static/svg/placeholders/no-image.svg'),
              url('https://play.teleporthq.io/static/svg/placeholders/no-image.svg'),
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1;
          }
          .component1-text1 {
            color: rgba(255, 255, 255, 1);
            width: 100%;
            height: 100%;
            font-size: 19px;
            box-shadow: 3px 1px 1px 0px rgba(0, 0, 0, 0.18000000715255737);
            font-style: Medium;
            text-align: left;
            font-family: Roboto Serif;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .component1-container2 {
            width: 52px;
            height: 48px;
            display: flex;
            align-items: flex-start;
            background-color: #edeadb;
          }
          .component1-icon1 {
            width: 100%;
            height: 100%;
          }
          .component1-text2 {
            display: inline-block;
          }
          .component1root-class-name {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name1 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name2 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name3 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name4 {
            background-image: dca726fb-8e8b-4b37-baf5-64d717653d32,
              8eeaa8bc-1475-47e5-9f5e-0294717c4180,
              cea84fff-fbbd-48b0-b9cf-82952715a6b5,
              fbe76def-d27e-420f-9c07-1f0a9f54e69e,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              d09eba1e-6108-4963-87d0-82f4efd2b90c,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1;
          }
          .component1root-class-name5 {
            background-image: 3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              8eeaa8bc-1475-47e5-9f5e-0294717c4180,
              cea84fff-fbbd-48b0-b9cf-82952715a6b5,
              fbe76def-d27e-420f-9c07-1f0a9f54e69e,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              d09eba1e-6108-4963-87d0-82f4efd2b90c,
              dca726fb-8e8b-4b37-baf5-64d717653d32,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1;
          }
          .component1root-class-name6 {
            background-image: d09eba1e-6108-4963-87d0-82f4efd2b90c,
              8eeaa8bc-1475-47e5-9f5e-0294717c4180,
              cea84fff-fbbd-48b0-b9cf-82952715a6b5,
              fbe76def-d27e-420f-9c07-1f0a9f54e69e,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              dca726fb-8e8b-4b37-baf5-64d717653d32,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1;
          }
          .component1root-class-name7 {
            background-image: 4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              8eeaa8bc-1475-47e5-9f5e-0294717c4180,
              cea84fff-fbbd-48b0-b9cf-82952715a6b5,
              fbe76def-d27e-420f-9c07-1f0a9f54e69e,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              d09eba1e-6108-4963-87d0-82f4efd2b90c,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              dca726fb-8e8b-4b37-baf5-64d717653d32,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1;
          }
          .component1root-class-name8 {
            background-image: 3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              8eeaa8bc-1475-47e5-9f5e-0294717c4180,
              cea84fff-fbbd-48b0-b9cf-82952715a6b5,
              fbe76def-d27e-420f-9c07-1f0a9f54e69e,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0,
              d09eba1e-6108-4963-87d0-82f4efd2b90c,
              3d54e6b3-87f4-4dcd-a689-ab534d5fd6d1,
              dca726fb-8e8b-4b37-baf5-64d717653d32,
              4d9dbf73-d37f-456c-9a7e-66bda78f00e0;
          }
          .component1root-class-name9 {
            flex: 1;
            overflow: hidden;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name10 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name11 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name12 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name13 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          .component1root-class-name14 {
            flex: 1;
            max-width: 170px;
            min-width: 120px;
            aspect-ratio: 16/9;
          }
          @media (max-width: 479px) {
            .component1-text1 {
              font-size: 16px;
            }
          }
        `}
      </style>
    </>
  )
}

Component1.defaultProps = {
  rootClassName: '',
  text1: undefined,
}

Component1.propTypes = {
  rootClassName: PropTypes.string,
  text1: PropTypes.element,
}

export default Component1
