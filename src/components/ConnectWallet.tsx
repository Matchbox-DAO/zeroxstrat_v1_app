import { useStarknet, InjectedConnector } from '@starknet-react/core'

export function ConnectWallet() {
  const { account, connect } = useStarknet()

  const injected = new InjectedConnector()

  if (account) {
    return <p>Account: {account}</p>
  }

  return <button onClick={() => connect(injected)}>Connect</button>
}
