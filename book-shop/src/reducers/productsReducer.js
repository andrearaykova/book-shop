import {FETCH_DATA_SUCCESS, CREATE_BOOK_SUCCESS, CREATE_BOOK_ERROR, EDIT_BOOK_SUCCESS, EDIT_BOOK_ERROR,
  REDIRECTED, DELETE_BOOK} from '../actions/actionTypes'

function productsReducer (state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return reconcile(state, action.data)
    case CREATE_BOOK_SUCCESS:
      return reconcile(state, [action.data])
    case EDIT_BOOK_SUCCESS:
      return reconcile(state, [action.data])
    case DELETE_BOOK:
      return state.filter(e => e._id !== action.id)
    default:
      return state
  }
}

function createProductReducer (state = {success: false}, action) {
  switch (action.type) {
    case CREATE_BOOK_SUCCESS:
      return Object.assign({}, state, {success: true})
    case REDIRECTED:
      return Object.assign({}, state, {success: false})
    default:
      return state
  }
}

function createProductErrorReducer (state = {hasError: false, message: ''}, action) {
  switch (action.type) {
    case CREATE_BOOK_ERROR:
      return Object.assign({}, state, {hasError: true, message: action.error})
    case CREATE_BOOK_SUCCESS:
      return Object.assign({}, state, {hasError: false, message: ''})
    default:
      return state
  }
}

function editProductReducer (state = {success: false}, action) {
  switch (action.type) {
    case EDIT_BOOK_SUCCESS:
      return Object.assign({}, state, {success: true})
    case REDIRECTED:
      return Object.assign({}, state, {success: false})
    default:
      return state
  }
}

function editProductErrorReducer (state = {hasError: false, message: ''}, action) {
  switch (action.type) {
    case EDIT_BOOK_ERROR:
      return Object.assign({}, state, {hasError: true, message: action.error})
    case EDIT_BOOK_SUCCESS:
      return Object.assign({}, state, {hasError: false, message: ''})
    default:
      return state
  }
}

function reconcile (oldData, newData) {
  const newDataById = {}
  for (const entry of newData) {
    newDataById[entry._id] = entry
  }

  const result = []
  for (const entry of oldData) {
    if (newDataById[entry._id]) {
      result.push(newDataById[entry._id])
      delete newDataById[entry._id]
    } else {
      result.push(entry)
    }
  }

  for (const entryId in newDataById) {
    result.push(newDataById[entryId])
  }

  return result
}

export {
  productsReducer,
  createProductReducer,
  createProductErrorReducer,
  editProductReducer,
  editProductErrorReducer
}
