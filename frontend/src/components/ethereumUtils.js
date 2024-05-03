import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

export const connectWallet = () => {
  provider.send('eth_requestAccounts', [])
    .catch(() => console.log('user rejected request'));
};

export const createSiweMessage = (address, statement) => {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return message.prepareMessage();
};

export const signInWithEthereum = async () => {
  try {
    const signer = await provider.getSigner();
    const message = createSiweMessage(
      signer.address,
      'Sign in with Ethereum to the app.'
    );
    console.log(await signer.signMessage(message));
  } catch (error) {
    console.error('Error signing in with Ethereum:', error);
  }
};
