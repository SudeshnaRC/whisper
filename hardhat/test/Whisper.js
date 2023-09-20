const { expect } = require("chai");
const {
  time,
  loadFixture
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe("Whisper contract", function () {

  async function deployWhisperFixture() {
    const [user] = await ethers.getSigners();
    const Whisper = await ethers.getContractFactory("Whisper");
    const whisper = await Whisper.deploy();

    return {whisper, user};
  }

   describe("Whisper Submission", function () {

    it("User should be able to submit a new whisper", async function () {
        const { whisper, user } = await loadFixture(deployWhisperFixture);

        const newWhisper = "String reference to audio data";

        await expect(whisper.getLatestWhisper(user.address)).to.be.revertedWith("This user has no whispers.");
   
        await expect(whisper.connect(user).addWhisper(newWhisper)).to.emit(whisper, "WhisperSubmitted");
        const updatedWhisper = await whisper.getLatestWhisper(user.address);
    
        expect(updatedWhisper).to.equal(newWhisper);
    });

  });
});