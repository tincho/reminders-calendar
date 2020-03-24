import React from 'react'

const SelectColor = ({ current, onSelect }) => {
  const palette = [
    '#97E5B7',
    '#F9E9C7',
    '#8CCCCF',
    '#D870AB',
    '#EFB292'
  ]
  const [selected, setSelected] = React.useState(current || palette[0])

  React.useEffect(() => {
    onSelect(selected)
    // eslint-disable-next-line
  }, [])

  return palette.map(color => (
    <button
      key={color}
      type="button"
      style={{
        display: 'inline-block',
        width: 20,
        height: 20,
        margin: 5,
        backgroundColor: color,
        border: selected === color ? '1px solid black' : 'none'
      }}
      onClick={() => {
        setSelected(color)
        onSelect(color)
      }}>
      &nbsp;
    </button>
    )
  )
}

export default SelectColor