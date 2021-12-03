import React, {useState, useRef, useEffect} from 'react'
import {useDidMountEffect, useForceUpdate} from 'react-more-hooks'
import './css.css'

interface IFade extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode,
  visible: boolean,
  timer?: number
}

const Fade: React.FunctionComponent<IFade> = ({visible = true, timer = 300, ...props}) => {
  const [render, setRender] = useState(visible)
  const first = useRef(true)
  const force = useForceUpdate()

  useEffect(() => {
    if (visible) setRender(true)
  }, [visible])

  const onAnimationEnd = () => {
    if (!visible) setRender(false)
  }

  useDidMountEffect(() => {
    first.current = false
    force()
  }, [visible])

  const animation = (() => {
    if (first.current) {
      return ''
    } else {
      return `${visible ? 'fadeIn' : 'fadeOut'} ${timer}ms`
    }
  })()

  return (
    render && (
      <div
        style={{
          animation: animation,
          position: 'relative'
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {props.children}
      </div>
    )
  )
}

export default Fade