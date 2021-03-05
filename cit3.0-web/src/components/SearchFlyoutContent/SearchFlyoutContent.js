import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";

export default function SearchFlyoutContent() {
  return (
    <div>
      <h2>Filter your search</h2>
      <h3>General site details</h3>
      <NumberRangeFilter />
      <br />
      {/* <Switch
      checked={waterSwitchValue}
      onChange={updateWaterSwitchValue(waterSwitchValue)}
      /> */}
    </div>
  );
}
