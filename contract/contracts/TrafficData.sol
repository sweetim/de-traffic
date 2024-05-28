// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TrafficData {
    uint public constant LLA_DECIMAL = 6;

    struct TrafficLight {
        address owner;
        uint256 lat;
        uint256 lng;
        uint256 orientation;
        string[] uri;
        TrafficLightValidationStatus validationStatus;
    }

    enum TrafficLightValidationStatus {
        Waiting,
        Validating,
        Accepted,
        Rejected
    }

    uint256 public trafficLightsIndex = 0;
    TrafficLight[] public trafficLights;

    struct ValidatorMetadata {
        string name;
        address owner;
        string[] supportedModels;
        uint256 validatedCount;
    }

    mapping(address => ValidatorMetadata) public validators;
    uint256 public validatorIndex = 0;
    address[] public validatorsAddresses;

    event NewTrafficLightRegister(uint256 indexed index);

    function getAllValidators()
        public
        view
        returns (ValidatorMetadata[] memory)
    {
        ValidatorMetadata[] memory output = new ValidatorMetadata[](
            validatorIndex
        );
        for (uint256 i = 0; i < validatorIndex; i++) {
            address validatorAddress = validatorsAddresses[i];
            ValidatorMetadata memory metadata = validators[validatorAddress];
            output[i] = metadata;
        }
        return output;
    }

    function registerTrafficLight(TrafficLight memory input) public {
        input.owner = msg.sender;
        input.validationStatus = TrafficLightValidationStatus.Waiting;
        trafficLights.push(input);

        emit NewTrafficLightRegister(trafficLightsIndex);
        trafficLightsIndex += 1;
    }

    function getTrafficLightByIndex(
        uint256 index
    ) public view returns (TrafficLight memory) {
        require(trafficLightsIndex > index, "index out of range");
        return trafficLights[index];
    }

    function registerValidator(
        string calldata name,
        string[] calldata supportedModels
    ) public {
        ValidatorMetadata memory metadata = ValidatorMetadata({
            name: name,
            owner: msg.sender,
            supportedModels: supportedModels,
            validatedCount: 0
        });

        validators[msg.sender] = metadata;
        validatorsAddresses.push(msg.sender);
        validatorIndex += 1;
    }

    function getValidatorMetadata(
        address validator
    ) public view returns (ValidatorMetadata memory) {
        return validators[validator];
    }

    function getIndex() public view returns (uint256) {
        return trafficLightsIndex;
    }

    function updateValidationStatus(
        uint256 id,
        TrafficLightValidationStatus validationStatus
    ) public {
        require(
            validators[msg.sender].owner == msg.sender,
            "user is not a validator, please register"
        );
        validators[msg.sender].validatedCount += 1;
        trafficLights[id].validationStatus = validationStatus;
    }

    function addImages(uint256 id, string calldata imageUri) public {
        trafficLights[id].uri.push(imageUri);
    }

    function updateTrafficLight(
        uint256 id,
        uint64 lat,
        uint64 lng,
        uint64 orientation,
        string[] memory uri
    ) public {
        require(id < trafficLightsIndex, "invalid id");

        trafficLights[id].lat = lat;
        trafficLights[id].lng = lng;
        trafficLights[id].orientation = orientation;
        trafficLights[id].uri = uri;
    }

    function getTrafficLights() public view returns (TrafficLight[] memory) {
        return trafficLights;
    }
}
