const Statbar = ({ value, max, style }) => {
    const containerStyles = {
        verticalAlign: 'middle',
        height: 20,
        width: `${max}%`,
        borderRadius: 5,
        gridArea: style.gridArea
    }
    
      const fillerStyles = {
        height: '100%',
        width: `${value}%`,
        backgroundColor: 'yellow',
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
