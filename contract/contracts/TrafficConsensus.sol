// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TrafficConsensus {


    struct Validator {
        address validatorAddress;
        uint stakedAmount;
        bool exists;
    }

    mapping(address => Validator) private validators;
    address[] private validatorcount;

    uint public trafficConsensusThreshold;
    uint public totalStakeAmount;

    struct Proposal {
        uint Id;
        uint votes;
        bool executed;
        mapping(address => bool) votecasted;
    }
    mapping(uint => Proposal) public proposals;
    uint public proposalCount;

    modifier onlyValidator() {
        require(isValidator(msg.sender), "Only the validators can perform this action");
        _;
    }

    event ValidatorAdded(address indexed validator);
    event ValidatorRemoved(address indexed validator);
    event ProposalCreated(uint indexed proposalId);
    event VoteCasted(uint indexed proposalId, address indexed validator, uint votes);
    event ProposalExecuted(uint indexed proposalId);
    event Slashed(address indexed validator, uint amount);

    constructor() {
        trafficConsensusThreshold = 1;
    }

    function addValidator(address _validator, uint _stakeAmount) external {
        require(isValidator(_validator), "Validator already exists");
        validators[_validator] = Validator(_validator, _stakeAmount, true);
        validatorcount.push(_validator);
        totalStakeAmount += _stakeAmount;
        emit ValidatorAdded(_validator);
    }

    function removeValidator(address _validator) external onlyValidator {
        require(isValidator(_validator), "Validator does not exist");

        uint slashedAmount = validators[_validator].stakedAmount;
        validators[_validator].exists = false;
        totalStakeAmount -= slashedAmount;
        emit Slashed(_validator, slashedAmount);

        for (uint i = 0; i < validatorcount.length; i++) {
            if (validatorcount[i] == _validator) {
                validatorcount[i] = validatorcount[validatorcount.length - 1];
                validatorcount.pop();
                break;
            }
        }

        emit ValidatorRemoved(_validator);
    }

    function createProposal() external onlyValidator returns (uint) {
        proposalCount++;
        // proposals[proposalCount] = Proposal(proposalCount, 0, false);
        emit ProposalCreated(proposalCount);
        return proposalCount;
    }

    function vote(uint _proposalId, uint _votes) external onlyValidator {
        // require(proposals[_proposalId].id != 0, 'Invalid proposal ID');
        require(!proposals[_proposalId].executed, 'Proposal already executed');
        require(_votes > 1, 'Votes must be greater than one');
        require(!proposals[_proposalId].votecasted[msg.sender], 'Already voted on this proposal');
        require(validators[msg.sender].stakedAmount >= _votes, 'stake not enough');

        validators[msg.sender].stakedAmount -= _votes;
        totalStakeAmount -= _votes;

        proposals[_proposalId].votes += _votes;
        proposals[_proposalId].votecasted[msg.sender] = true;
        emit VoteCasted(_proposalId, msg.sender, _votes);

        if (proposals[_proposalId].votes >= trafficConsensusThreshold) {
            executeProposal(_proposalId);
        }
    }

    function executeProposal(uint _proposalId) internal {
        proposals[_proposalId].executed = true;
        emit ProposalExecuted(_proposalId);
        // Perform proposal execution logic
    }

    function isValidator(address _validator) public view returns (bool) {
        return validators[_validator].exists;
    }

    function getValidators() public view returns (address[] memory) {
        return validatorcount;
    }

    function getStakedAmount(address _validator) public view returns (uint) {
        return validators[_validator].stakedAmount;
    }
}
