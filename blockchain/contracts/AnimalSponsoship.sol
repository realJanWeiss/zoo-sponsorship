// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
 
contract AnimalSponsorship is ERC1155, AccessControl, ERC1155Burnable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant MAX_TOKEN_ID = 5;
    address public immutable zooOwner;
 
    mapping(uint256 => string) private _tokenURIs;
 
    constructor() ERC1155("") {
        zooOwner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
 
        // Mint 100 of each elephant token to the zoo
        for (uint256 i = 1; i <= MAX_TOKEN_ID; ++i) {
            _mint(zooOwner, i, 100, "");
        }
 
        // IPFS metadata
        _tokenURIs[1] = "https://ipfs.io/ipfs/bafybeidayqdm27jrbzawooe2dmw4scjck6ibyzqvifcinbzmx6nqx7srwq/Tonga.json";
        _tokenURIs[2] = "https://ipfs.io/ipfs/bafybeidayqdm27jrbzawooe2dmw4scjck6ibyzqvifcinbzmx6nqx7srwq/Numbi.json";
        _tokenURIs[3] = "https://ipfs.io/ipfs/bafybeidayqdm27jrbzawooe2dmw4scjck6ibyzqvifcinbzmx6nqx7srwq/Mongu.json";
        _tokenURIs[4] = "https://ipfs.io/ipfs/bafybeidayqdm27jrbzawooe2dmw4scjck6ibyzqvifcinbzmx6nqx7srwq/Iqhwa.json";
        _tokenURIs[5] = "https://ipfs.io/ipfs/bafybeidayqdm27jrbzawooe2dmw4scjck6ibyzqvifcinbzmx6nqx7srwq/Abu.json";
    }
 
    /// Token transfer from one user to another
    function transferToken(address from, address to, uint256 tokenId) public {
        require(from != address(0) && to != address(0), "Invalid addresses");
        require(msg.sender == from, "Only the token owner can transfer");
        require(balanceOf(from, tokenId) >= 1, "Insufficient token balance");
        require(balanceOf(to, tokenId) == 0, "Recipient already owns this token");
 
        safeTransferFrom(from, to, tokenId, 1, "");
    }
 
    /// Return the token to the zoo instead of burning
    function returnToken(uint256 tokenId) public {
        require(balanceOf(msg.sender, tokenId) > 0, "You don't own this token");
        safeTransferFrom(msg.sender, zooOwner, tokenId, 1, "");
    }
 
    /// Metadata per animal
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId >= 1 && tokenId <= MAX_TOKEN_ID, "Invalid token ID");
        return _tokenURIs[tokenId];
    }
 
    /// Interface override for OpenZeppelin
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