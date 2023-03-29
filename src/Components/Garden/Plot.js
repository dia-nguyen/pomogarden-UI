function Plot({
  key,
  sprite,
  location,
  mouseEnter,
  mouseLeave,
  age,
  name,
  event,
  classes,
  state,
}) {

  return (
    <button
      key={key}
      className={`plot ${classes} location-${location}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={event ? () => event() : undefined}
      id={state}
    >
      {sprite && (
        <img
          src={`https://pomogarden.s3.us-west-1.amazonaws.com/${sprite}`}
          className={`${name} ${age}`}
          alt={name}
        />
      )}
    </button>
  );
}

export default Plot;