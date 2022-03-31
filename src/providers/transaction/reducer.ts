import { GetTransactionResponse } from 'starknet'
import { List } from 'immutable'
import { PopupContent, Transaction, TransactionSubmitted } from './model'

export interface TransactionManagerState {
  transactions: List<Transaction>
  popupList: List<PopupContent>
}

interface AddTransaction {
  type: 'add_transaction'
  transaction: TransactionSubmitted
}

interface RemoveTransaction {
  type: 'remove_transaction'
  transactionHash: string
}

interface UpdateTransaction {
  type: 'update_transaction'
  transactionResponse: GetTransactionResponse
  lastUpdatedAt: number
}

interface AddPopup {
  type: 'add_popup'
  popupContent: PopupContent
}

interface RemovePopup {
  type: 'remove_popup'
  transactionHash: string
}

export type Action = AddTransaction | RemoveTransaction | UpdateTransaction | AddPopup | RemovePopup

export function transactionManagerReducer(state: TransactionManagerState, action: Action): TransactionManagerState {
  if (action.type === 'add_transaction') {
    return {
      ...state,
      transactions: state.transactions.push(action.transaction),
    }
  } else if (action.type === 'remove_transaction') {
    return {
      ...state,
      transactions: state.transactions.filter((tx) => tx.transactionHash !== action.transactionHash),
    }
  } else if (action.type === 'update_transaction') {
    if (action.transactionResponse.status === 'NOT_RECEIVED') {
      return state
    }

    const entry = state.transactions.findEntry(
      (tx) => tx.transactionHash === action.transactionResponse.transaction['transaction_hash']
    )

    if (!entry) {
      return state
    }

    const [transactionIndex, transaction] = entry

    const txSummary = transaction.summary

    const newTransaction: Transaction = {
      status: action.transactionResponse.status,
      transaction: action.transactionResponse.transaction,
      transactionHash: action.transactionResponse.transaction['transaction_hash'],
      lastUpdatedAt: action.lastUpdatedAt,
      summary: txSummary,
    }

    return {
      ...state,
      transactions: state.transactions.set(transactionIndex, newTransaction),
    }
  } else if (action.type === 'add_popup') {
    return {
      ...state,
      popupList: state.popupList.push(action.popupContent),
    }
  } else if (action.type === 'remove_popup') {
    return {
      ...state,
      popupList: state.popupList.filter((popup) => popup.transactionHash !== action.transactionHash),
    }
  }
  return state
}
