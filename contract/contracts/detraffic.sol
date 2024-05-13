// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

pragma solidity ^0.8;

contract DeTraffic {
  // Define a struct to represent a traffic light
  struct TrafficLight {
    uint256 lat; // Latitude stored as an integer with appropriate decimals
    uint256 lng; // Longitude stored as an integer with appropriate decimals
    uint256 orientation; // Orientation in degrees (0-359)
    string[] uri; // Array of URIs
  }

  TrafficLight[] public lights;

  function createTrafficLight(
    uint256 _lat,
    uint256 _lng,
    uint256 _orientation,
    string[] memory _uri
  ) public {
    TrafficLight memory newLight = TrafficLight(_lat, _lng, _orientation, _uri);
    lights.push(newLight);
  }

  function updateTrafficLight(
    uint256 index,
    uint256 _lat,
    uint256 _lng,
    uint256 _orientation,
    string[] memory _uri
  ) public {
    require(index < lights.length, "Invalid index");

    lights[index].lat = _lat;
    lights[index].lng = _lng;
    lights[index].orientation = _orientation;
    lights[index].uri = _uri;
  }

  function getAllTrafficLight() public view returns (TrafficLight[] memory) {
    return lights;
  }
}
