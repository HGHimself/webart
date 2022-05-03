import { h } from 'preact'
import style from './style.css';

export default function FlexRow(props) {
    const styles = [style.flex]

    if ( props.flex ) {
      const flex = props.flex == "space-between" ? style['justify-between']
        : props.flex == "space-around" ? style['justify-around']
        : props.flex == "space-end" ? style['justify-end']
        : props.flex == "space-start" ? style['justify-start']
        : ''

      styles.push(flex)
    }

    if ( props.content ) {
      const content = props.content == "center" ? style['content-center']
        : ''

      styles.push(content)
    }

    if ( props.align ) {
      const align = props.align == "center" ? style['items-center']
        : ''

      styles.push(align)
    }

    if ( props.direction ) {
      const direction = props.direction == "column" ? style['direction-column']
        : props.direction == "row" ? style['direction-row']
        : ''

      styles.push(direction)
    }

    if ( props.wrap )  {
      const wrap = props.wrap == "wrap" ? style['wrap']
        : ''

      styles.push(wrap)
    }
    return <div class={styles.join(' ')}>{props.children}</div>
}
