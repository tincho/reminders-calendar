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
  }, [])
  return palette.map(color => (
    <a 
      key={color} 
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
    </a>
    )
  )
}

export default SelectColor