pragma solidity ^0.4.17;

contract Test {
    uint256[] public myArray;

    function Test() public {
        myArray.push(1);
        myArray.push(10);
        myArray.push(30);
    }

    function getMyArray() public view returns (uint256[]) {
        return myArray;
    }

    function getArrayLength() public view returns (uint256) {
        return myArray.length;
    }

    function getFirstElement() public view returns (uint256) {
        return myArray[0];
    }
}
