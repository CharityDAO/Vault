pragma solidity ^0.4.6;

import "../../installed_contracts/zeppelin/contracts/token/StandardToken.sol";

contract TestStandardToken is StandardToken {
  
  function TestStandardToken(address _addr1, address _addr2) {
	balances[_addr1] = 1;
	balances[_addr2] = 0;
  }
}