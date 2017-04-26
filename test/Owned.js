/* global artifacts */
/* global contract */
/* global web3 */
/* global assert */

const assertJump = require("./helpers/assertJump.js");

const Owned = artifacts.require("../contracts/Owned.sol");

contract("Owned", (accounts) => {
    let owned;

    beforeEach(async () => {
        owned = await Owned.new();
    });

    it("should have an owner", async () => {
        const owner = await owned.owner();
        assert.isTrue(owner !== 0);
    });

    it("changes owner after transfer", async () => {
        const other = accounts[ 1 ];
        await owned.changeOwner(other);
        const owner = await owned.owner();

        assert.isTrue(owner === other);
    });

    it("should prevent non-owners from transfering", async () => {
        const other = accounts[ 2 ];
        const owner = await owned.owner.call();
        assert.isTrue(owner !== other);
        try {
            await owned.changeOwner(other, { from: other });
        } catch (error) {
            return assertJump(error);
        }
        assert.fail("should have thrown before");
    });
  /*
  it('should guard ownership against stuck state', async function() {
    let originalOwner = await owned.owner();
    await owned.changeOwner(null, {from: originalOwner});
    let newOwner = await owned.owner();

    assert.equal(originalOwner, newOwner);
  });
*/
});
