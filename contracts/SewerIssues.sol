pragma solidity >=0.4.22 <0.9.0;

contract SewerIssues {
    uint public issueCount = 0;

    struct Issue {
        uint id;
        string permInfo;
    }

    mapping(uint => Issue) public issues;

    function createIssue(string memory _permInfo) public {
        issueCount ++;
        issues[issueCount] = Issue(
            issueCount,
            _permInfo
        );
    }
}