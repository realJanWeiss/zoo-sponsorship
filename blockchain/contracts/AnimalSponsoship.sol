// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
 
contract AnimalSponsorship is ERC1155, AccessControl, ERC1155Burnable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant MAX_TOKEN_ID = 13;
    address public immutable zooOwner;
 
    mapping(uint256 => string) private _tokenURIs;
 
    constructor() ERC1155("") {
        zooOwner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
 
        for (uint256 i = 1; i <= MAX_TOKEN_ID; ++i) {
            _mint(zooOwner, i, 100, "");
        }
 
        // Original Elefanten
        _tokenURIs[1] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Tonga.json";
        _tokenURIs[2] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Numbi.json";
        _tokenURIs[3] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Mongu.json";
        _tokenURIs[4] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Iqhwa.json";
        _tokenURIs[5] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Abu.json";

        _tokenURIs[6] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Kira.json";
        _tokenURIs[7] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Luma.json";
        _tokenURIs[8] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Taru.json";

        _tokenURIs[9] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Nanuk.json";
        _tokenURIs[10] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Svala.json";
        _tokenURIs[11] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Borek.json";
        
        _tokenURIs[12] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Amara.json";
        _tokenURIs[13] = "https://white-famous-butterfly-266.mypinata.cloud/ipfs/bafybeic34h4l4txfmpfondtsp63aztp65dfsuu6wkrnyn5psaxbx5mvkcu/Tambo.json";
    }
 
    function adopt(uint256 tokenId) public {
        require(msg.sender != zooOwner, "Zoo owner cannot adopt");
        require(tokenId >= 1 && tokenId <= MAX_TOKEN_ID, "Invalid token ID");
        require(balanceOf(msg.sender, tokenId) == 0, "You already adopted this animal");
        require(balanceOf(zooOwner, tokenId) > 0, "No tokens left for this animal");
 
        _safeTransferFrom(zooOwner, msg.sender, tokenId, 1, "");
    }
 
    function returnToken(uint256 tokenId) public {
        require(tokenId >= 1 && tokenId <= MAX_TOKEN_ID, "Invalid token ID");
        require(balanceOf(msg.sender, tokenId) > 0, "You don't own this token");
 
        safeTransferFrom(msg.sender, zooOwner, tokenId, 1, "");
    }
 
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId >= 1 && tokenId <= MAX_TOKEN_ID, "Invalid token ID");
        return _tokenURIs[tokenId];
    }
 
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}