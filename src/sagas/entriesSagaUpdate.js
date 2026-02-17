import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import entriesTypes from '../actions/entries.actions';

export function* updateEntrySaga() {
    yield takeLatest(entriesTypes.UPDATE_ENTRY, updateEntryInDb);
}

function* updateEntryInDb({ payload }) {
    const { id, entry } = payload;
    yield call(updateEntry, id, entry.description);
    yield call(updateEntryDetails, id, entry.value, entry.isExpense);
}

async function updateEntry(id, description) {
    await axios.patch(`http://localhost:3001/entries/${id}`, {
        description,
    });
}

async function updateEntryDetails(id, value, isExpense) {
    await axios.patch(`http://localhost:3001/values/${id}`, {
        value,
        isExpense,
    });
}
