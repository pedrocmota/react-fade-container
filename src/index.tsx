import React, {useRef} from 'react'
import {useDidMountEffect} from 'react-more-hooks'
import transition from 'transitionjs'

interface IFade extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode,
  visible: boolean,
  timer?: number
}

const Fade: React.FunctionComponent<IFade> = ({visible = true, timer = 300, ...props}) => {
  const ref = useRef<HTMLDivElement>()
  const display = useRef('block')
  useDidMountEffect(() => {
    if (visible) {
      display.current = ref.current.style.display
      transition.begin(ref.current, ['opacity 1 0'], {
        duration: `${timer}ms`,
        onTransitionEnd: function (element, finished) {
          if (finished) {
            element.style.display = 'none'
          }
        }
      })
    } else {
      ref.current.style.display = display.current
      transition.begin(ref.current, ['opacity 0 1'], {
        duration: `${timer}ms`
      })
    }
  }, [visible])
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  )
}

export default Fade