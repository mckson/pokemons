const Statbar = ({ value, max, style }) => {
    const containerStyles = {
        verticalAlign: 'middle',
        height: 10,
        width: `${max}%`,
        borderRadius: 5,
        gridArea: style.gridArea
    }
    
      const fillerStyles = {
        height: '100%',
        width: `${value}%`,
        backgroundColor: `#${(parseInt(value) === parseInt(max)) ? 'A2E333' : 'FD7F28'}`,
        borderRadius: 'inherit'
      }
    return (
        <div style={containerStyles}>
          <div style={fillerStyles}>
          </div>
        </div>
    )
}

export default Statbar
