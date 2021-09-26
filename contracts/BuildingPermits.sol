pragma solidity >=0.4.22 <0.9.0;

contract BuildingPermits {
    uint public permitCount = 0;

    struct Permit {
        uint id;
        bool applicantApprove;
        bool approvalOfPlanBoard;
        string permInfo;
    }

    mapping(uint => Permit) public permits;

    function createPermit(string memory _permInfo) public {
        permitCount ++;
        permits[permitCount] = Permit(
            permitCount,
            false,
            false,
            _permInfo
        );
    }
}